import { SigninController } from "api/controllers/auth/signinController"
import BaseController from "api/controllers/baseController"
import { IAuthServices } from "application/interfaces/iAuthServices"
import { AuthServices } from "application/services/authServices"
import { container } from "tsyringe"

export const authDI = () => {
    // container.registerSingleton<IAuthRepository>("AuthRepository", AuthRepository)
    container.registerSingleton<IAuthServices>("AuthServices", AuthServices)
    container.registerSingleton<BaseController>("SignInController", SigninController)
} 