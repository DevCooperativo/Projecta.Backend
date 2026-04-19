import { SigninDTO } from "@/application/dtos/auth/signinDTO";
import { SigninReturnDTO } from "@/application/dtos/auth/signinReturnDTO";
import { IAuthServices } from "@/application/interfaces/iAuthServices";
import IAdministratorRepository from "@/domain/repositories/iAdministratorRepository";
import IProfessorRepository from "@/domain/repositories/iProfessorRepository";
import IStudentRepository from "@/domain/repositories/iStudentRepository";
import { AccountTypeType, AccountType } from "@/infrastructure/authentication/constants/accountType";
import { base64url, EncryptJWT } from "jose";
import { inject, injectable } from "tsyringe";

@injectable()
export class AuthServices implements IAuthServices {
    constructor(
        @inject("StudentRepository")
        private readonly studentRepository: IStudentRepository,
        @inject("ProfessorRepository")
        private readonly professorRepository: IProfessorRepository,
        @inject("AdministratorRepository")
        private readonly administratorRepository: IAdministratorRepository,
    ) {
    }
    async SignInAsync(signinDTO: SigninDTO): Promise<SigninReturnDTO> {
        const student = await this.studentRepository.FindByEmail(signinDTO.email) as SigninReturnDTO | null;
        if (student) {
            const token = await this.generateToken(signinDTO.email, AccountType.student);
            return new SigninReturnDTO(student.email, token, student.accountType);
        }
        const professor = await this.professorRepository.FindByEmail(signinDTO.email) as SigninReturnDTO | null;
        if (professor) {
            const token = await this.generateToken(signinDTO.email, AccountType.professor);
            return new SigninReturnDTO(professor.email, token, professor.accountType);
        }
        const administrator = await this.administratorRepository.FindByEmail(signinDTO.email) as SigninReturnDTO | null;
        if (administrator) {
            const token = await this.generateToken(signinDTO.email, AccountType.administrator);
            return new SigninReturnDTO(administrator.email, token, administrator.accountType);
        }
        throw new Error("Invalid email or password");
    }

    private async generateToken(email: string, accountType: AccountTypeType): Promise<string> {
        const secretKey = process.env.JWT_SECRET_KEY;
        const secret = base64url.decode(secretKey ?? "");
        if (!secretKey) {
            throw new Error("JWT secret key is not defined in environment variables.");
        }
        const token = await new EncryptJWT({ email, accountType })
            .setProtectedHeader({ alg: "dir", enc: "A256GCM" })
            .setExpirationTime("2h")
            .setAudience("urn:projecta:audience")
            .setIssuer("urn:projecta:issuer")
            .encrypt(secret);
        return token;
    }
}