import { SigninDTO } from "@/application/dtos/auth/signinDTO";
import { SigninReturnDTO } from "@/application/dtos/auth/signinReturnDTO";
import { IAuthServices } from "@/application/interfaces/iAuthServices";
import IAdministratorRepository from "@/domain/repositories/iAdministratorRepository";
import IAuthRepository from "@/domain/repositories/iAuthRepository";
import IProfessorRepository from "@/domain/repositories/iProfessorRepository";
import IStudentRepository from "@/domain/repositories/iStudentRepository";
import { AccountType, AccountTypeType } from "@/infrastructure/authentication/constants/accountType";
import { base64url, EncryptJWT } from "jose";
import { inject, injectable } from "tsyringe";
import { IUnitOfWork } from "../unitOfWork/iUnitOfWork";

@injectable()
export class AuthServices implements IAuthServices {
    constructor(
        @inject("AuthRepository")
        private readonly authRepository: IAuthRepository,
        @inject("StudentRepository")
        private readonly studentRepository: IStudentRepository,
        @inject("ProfessorRepository")
        private readonly professorRepository: IProfessorRepository,
        @inject("AdministratorRepository")
        private readonly administratorRepository: IAdministratorRepository,
        @inject("SequelizeUnitOfWork")
        private readonly unitOfWork: IUnitOfWork,
    ) {}

    async SignInAsync(signinDTO: SigninDTO): Promise<SigninReturnDTO> {
        return await this.unitOfWork.execute(async (trx) => {
            const account = await this.authRepository.FindByEmail(signinDTO.email, trx);
            if (!account) throw new Error("Invalid email or password");

            const student = await this.studentRepository.FindByEmail(signinDTO.email, trx);
            if (student) {
                const token = await this.generateToken(signinDTO.email, AccountType.student);
                return new SigninReturnDTO(student.email, token, AccountType.student);
            }

            const professor = await this.professorRepository.FindByEmail(signinDTO.email, trx);
            if (professor) {
                const token = await this.generateToken(signinDTO.email, AccountType.professor);
                return new SigninReturnDTO(professor.email, token, AccountType.professor);
            }

            const administrator = await this.administratorRepository.FindByEmail(signinDTO.email, trx);
            if (administrator) {
                const token = await this.generateToken(signinDTO.email, AccountType.administrator);
                return new SigninReturnDTO(administrator.email, token, AccountType.administrator);
            }

            throw new Error("Invalid email or password");
        });
    }

    private async generateToken(email: string, accountType: AccountTypeType): Promise<string> {
        const secretKey = process.env.JWT_SECRET_KEY;
        if (!secretKey) throw new Error("JWT secret key is not defined in environment variables.");
        const secret = base64url.decode(secretKey);
        const token = await new EncryptJWT({ email, accountType })
            .setProtectedHeader({ alg: "dir", enc: "A256GCM" })
            .setExpirationTime("2h")
            .setAudience("urn:projecta:audience")
            .setIssuer("urn:projecta:issuer")
            .encrypt(secret);
        return token;
    }
}
