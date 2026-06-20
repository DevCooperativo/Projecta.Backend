import { Request, Response } from "express";
import BaseController from "../baseController";
import { inject, injectable } from "tsyringe";
import { IAuthServices } from "@/application/interfaces/iAuthServices";
import ControllerExceptionThrowHelper from "@/api/helpers/controllerExceptionThrowHelper";
import { ResponseBuilder } from "@/api/helpers/responseBuilder";

@injectable()
export class MeController extends BaseController {
    constructor(
        @inject("AuthServices")
        private readonly authServices: IAuthServices
    ) {
        super()
    }
    async Handle(req: Request, res: Response): Promise<Response> {
        try {
            const result = await this.authServices.Me()
            return res.status(200).json(
                ResponseBuilder.success("User data retrieved", "ME_SUCCESS", 200, {
                    ...result
                })
            )
        } catch (ex) {
            return ControllerExceptionThrowHelper.Throw(res, ex)
        }
    }
}
