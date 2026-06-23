import { SigninDTO } from "@/application/dtos/auth/signinDTO";
import { SigninReturnDTO } from "@/application/dtos/auth/signinReturnDTO";
import { MeReturnDTO } from "../dtos/auth/meReturnDTO";
import { UpdateProfileInputDTO } from "../dtos/auth/updateProfileInputDTO";
import { UpdateProfileReturnDTO } from "../dtos/auth/updateProfileReturnDTO";

export interface IAuthServices {
    SignInAsync(signinDTO: SigninDTO): Promise<SigninReturnDTO>
    Me(): Promise<MeReturnDTO>
    UpdateProfile(data: UpdateProfileInputDTO): Promise<UpdateProfileReturnDTO>
}