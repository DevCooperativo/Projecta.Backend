import { SigninDTO } from "@/application/dtos/auth/signinDTO";
import { SigninReturnDTO } from "@/application/dtos/auth/signinReturnDTO";

export interface IAuthServices {
    SignInAsync(signinDTO: SigninDTO): Promise<SigninReturnDTO>
}