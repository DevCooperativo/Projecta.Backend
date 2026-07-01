import { NextFunction, Request, Response } from "express";
import BaseController from "../baseController";
import { inject, injectable } from "tsyringe";
import ILaboratoryServices from "@/application/interfaces/iLaboratoryServices";
import ControllerExceptionThrowHelper from "@/api/helpers/controllerExceptionThrowHelper";
import { ResponseBuilder } from "@/api/helpers/responseBuilder";

@injectable()
class GetAllLaboratoriesController implements BaseController {
    constructor(
        @inject("LaboratoryServices")
        private readonly laboratoryServices: ILaboratoryServices
    ) { }
    async Handle(req: Request, res: Response): Promise<Response>{
        try {
            const user = req.user
            // ApiException.When(!user, ApiExceptionNameEnum.UNAUTHENTICATED_USER, "You are not authenticated to the API. Authenticate yourself", 401)
            const result = await this.laboratoryServices.GetAllAsync()
            return res.status(200).json(ResponseBuilder.success("Success", "OK", 200, result))
        } catch (ex) {
            return ControllerExceptionThrowHelper.Throw(res, ex)
        }
    }

}
export default GetAllLaboratoriesController
