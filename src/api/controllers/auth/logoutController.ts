import { Request, Response } from "express";
import BaseController from "../baseController";
import { inject, injectable } from "tsyringe";
import { IAuthServices } from "@/application/interfaces/iAuthServices";
import ControllerExceptionThrowHelper from "@/api/helpers/controllerExceptionThrowHelper";
import { ResponseBuilder } from "@/api/helpers/responseBuilder";

@injectable()
export class LogoutController extends BaseController {
    constructor(
        @inject("AuthServices")
        private readonly authServices: IAuthServices
    ) {
        super()
    }
    async Handle(req: Request, res: Response): Promise<Response> {
        try {
            if (!req.cookies["auth_cookie"])
                return res.status(400).json(ResponseBuilder.fail("Already logged out", "warn", "ALREADY_LOGGED_OUT", 400, []))
            res.clearCookie("auth_cookie")
            return res.status(200).json(
                ResponseBuilder.success("Logout successfull", "LOGOUT_SUCCESS", 200, {})
            )
        } catch (ex) {
            return ControllerExceptionThrowHelper.Throw(res, ex)
        }
    }
}
