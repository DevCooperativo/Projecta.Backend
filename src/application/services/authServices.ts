import { SigninDTO } from "@/application/dtos/auth/signinDTO";
import { SigninReturnDTO } from "@/application/dtos/auth/signinReturnDTO";
import { IAuthServices } from "@/application/interfaces/iAuthServices";
import IAdministratorRepository from "@/domain/repositories/iAdministratorRepository";
import IAuthRepository from "@/domain/repositories/iAuthRepository";
import IProfessorRepository from "@/domain/repositories/iProfessorRepository";
import IStudentRepository from "@/domain/repositories/iStudentRepository";
import { AccountType } from "@/infrastructure/authentication/constants/accountType";
import { verifyPassword } from "@/infrastructure/helpers/passwordHasher";
import { base64url, EncryptJWT } from "jose";
import { inject, injectable } from "tsyringe";
import { IUnitOfWork } from "../unitOfWork/iUnitOfWork";
import ApplicationException from "../exceptions/applicationException";
import { ApplicationExceptionName } from "../constants/applicationExceptionName";
import { MeReturnDTO } from "../dtos/auth/meReturnDTO";
import { IUserContextServices } from "../interfaces/iUserContextServices";
import { UpdateProfileInputDTO } from "../dtos/auth/updateProfileInputDTO";
import { UpdateProfileReturnDTO } from "../dtos/auth/updateProfileReturnDTO";

@injectable()
export class AuthServices implements IAuthServices {
    constructor(
        @inject("AuthRepository")
        private readonly authRepository: IAuthRepository,
        @inject("StudentRepository")
        private readonly studentRepository: IStudentRepository,
        @inject("UserContextServices")
        private readonly userContextServices: IUserContextServices,
        @inject("ProfessorRepository")
        private readonly professorRepository: IProfessorRepository,
        @inject("AdministratorRepository")
        private readonly administratorRepository: IAdministratorRepository,
        @inject("SequelizeUnitOfWork")
        private readonly unitOfWork: IUnitOfWork,
    ) { }
    async Me() {
        const userContext = this.userContextServices.GetCurrentContext()
        switch (userContext.currentAccountType) {
            case "student": {
                const result = await this.studentRepository.FindByEmail(userContext.email)
                if (!result)
                    throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "User not found", 404)
                return new MeReturnDTO(result.id, result.name, result.email, AccountType.student)
            }
            case "professor": {
                const result = await this.professorRepository.FindByEmail(userContext.email)
                if (!result)
                    throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "User not found", 404)
                return new MeReturnDTO(result.id, result.name, result.email, AccountType.professor)
            }
            case "administrator": {
                const result = await this.administratorRepository.FindByEmail(userContext.email)
                if (!result)
                    throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "User not found", 404)
                return new MeReturnDTO(result.id, result.name, result.email, AccountType.administrator)
            }
            default:
                throw new ApplicationException(ApplicationExceptionName.INVALID_OPERATION, "Invalid user type detected in the server", 500)
        }
    }

    async UpdateProfile(data: UpdateProfileInputDTO): Promise<UpdateProfileReturnDTO> {
        return await this.unitOfWork.execute(async (trx) => {
            switch (data.accountType) {
                case AccountType.student: {
                    const student = await this.studentRepository.FindByEmail(data.userEmail, trx)
                    if (!student)
                        throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "No student profile found for this user", 404)
                    student.updatePersonalData(data.name, data.birthdate)
                    await this.studentRepository.Update(student.id, student, trx)
                    return new UpdateProfileReturnDTO(student.id, student.name, student.email, AccountType.student, undefined, undefined, student.birthdate, student.term, student.shift)
                }
                case AccountType.professor: {
                    const professor = await this.professorRepository.FindByEmail(data.userEmail, trx)
                    if (!professor)
                        throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "No professor profile found for this user", 404)
                    professor.update(data.name ?? professor.name, data.registration ?? professor.registration, data.telephone ?? professor.telephone)
                    await this.professorRepository.Update(professor.id, professor, trx)
                    return new UpdateProfileReturnDTO(professor.id, professor.name, professor.email, AccountType.professor, professor.registration, professor.telephone, undefined, undefined, undefined, professor.coordinationId)
                }
                case AccountType.administrator: {
                    const administrator = await this.administratorRepository.FindByEmail(data.userEmail, trx)
                    if (!administrator)
                        throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "No administrator profile found for this user", 404)
                    administrator.update(data.name ?? administrator.name)
                    const updated = await this.administratorRepository.Update(administrator, trx)
                    if (!updated)
                        throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "Failed to update administrator profile", 500)
                    return new UpdateProfileReturnDTO(updated.id, updated.name, updated.email, AccountType.administrator)
                }
                default:
                    throw new ApplicationException(ApplicationExceptionName.INVALID_OPERATION, "Invalid user type detected in the server", 500)
            }
        })
    }

    async SignInAsync(signinDTO: SigninDTO): Promise<SigninReturnDTO> {
        return await this.unitOfWork.execute(async (trx) => {
            const account = await this.authRepository.FindByEmail(signinDTO.email, trx);
            if (!account) throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "Invalid email or password", 404);

            if (!verifyPassword(signinDTO.password, account.passwordHash))
                throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "Invalid email or password", 404);

            const student = await this.studentRepository.FindByEmail(signinDTO.email, trx);
            if (student) {
                const token = await this.generateToken(signinDTO.email, [AccountType.student], AccountType.student);
                return new SigninReturnDTO(student.id, student.name, account.email, token, AccountType.student);
            }

            const professor = await this.professorRepository.FindByEmail(signinDTO.email, trx);
            if (professor) {
                const token = await this.generateToken(signinDTO.email, [AccountType.professor], AccountType.professor);
                return new SigninReturnDTO(professor.id, professor.name, account.email, token, AccountType.professor);
            }

            const administrator = await this.administratorRepository.FindByEmail(signinDTO.email, trx);
            if (administrator) {
                const token = await this.generateToken(signinDTO.email, [AccountType.administrator], AccountType.administrator);
                return new SigninReturnDTO(administrator.id, administrator.name, account.email, token, AccountType.administrator);
            }

            throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "No profile found for this account", 404);
        });
    }

    private async generateToken(email: string, profiles: AccountType[], accountType: AccountType): Promise<string> {
        const secretKey = process.env.JWT_SECRET_KEY;
        if (!secretKey) throw new Error("JWT secret key is not defined in environment variables.");
        const secret = base64url.decode(secretKey);
        const token = await new EncryptJWT({ email, accountTypes: profiles, userType: accountType })
            .setProtectedHeader({ alg: "dir", enc: "A256GCM" })
            .setExpirationTime("2h")
            .setAudience("urn:projecta:audience")
            .setIssuer("urn:projecta:issuer")
            .encrypt(secret);
        return token;
    }

}
