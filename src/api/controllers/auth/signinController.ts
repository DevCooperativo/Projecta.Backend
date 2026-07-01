import { Request, Response } from "express";
import BaseController from "../baseController";
import { inject, injectable } from "tsyringe";
import { SigninDTO } from "@/application/dtos/auth/signinDTO";
import { IAuthServices } from "@/application/interfaces/iAuthServices";
import ControllerExceptionThrowHelper from "@/api/helpers/controllerExceptionThrowHelper";
import { ResponseBuilder } from "@/api/helpers/responseBuilder";

@injectable()
export class SigninController extends BaseController {
    constructor(
        @inject("AuthServices")
        private readonly authServices: IAuthServices
    ) {
        super()
    }
    async Handle(req: Request, res: Response): Promise<Response> {
        try {
            const { email, password } = req.body || {}
            const signinDTO = new SigninDTO(email, password)
            const result = await this.authServices.SignInAsync(signinDTO)
            res.cookie("auth_cookie", result.token, {
                httpOnly: true,
                secure: true,
                sameSite: "strict"
            })
            return res.status(200).json(
                ResponseBuilder.success("Sign in successful", "SIGN_IN_SUCCESS", 200, {
                    id: result.id,
                    name: result.name,
                    email: result.email,
                    profileType: result.profileType,
                })
            )
        } catch (ex) {
            return ControllerExceptionThrowHelper.Throw(res, ex)
        }
    }
}
