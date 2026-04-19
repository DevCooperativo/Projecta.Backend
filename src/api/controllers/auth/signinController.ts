import { NextFunction, Request, Response } from "express";
import BaseController from "../baseController";
import { inject, injectable } from "tsyringe";
import { SigninDTO } from "@/application/dtos/auth/signinDTO";
import { IAuthServices } from "@/application/interfaces/iAuthServices";
import ControllerExceptionThrowHelper from "@/api/helpers/controllerExceptionThrowHelper";

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
            return res.status(200).json({ token: result.token })
        } catch (ex) {
            return ControllerExceptionThrowHelper.Throw(res, ex)
        }
    }
}
