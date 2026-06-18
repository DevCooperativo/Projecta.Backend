import { SigninDTO } from "@/application/dtos/auth/signinDTO";
import { SigninReturnDTO } from "@/application/dtos/auth/signinReturnDTO";
import { MeReturnDTO } from "../dtos/auth/meReturnDTO";

export interface IAuthServices {
    SignInAsync(signinDTO: SigninDTO): Promise<SigninReturnDTO>
    Me(): Promise<MeReturnDTO>
}