import { inject, injectable } from "tsyringe";
import BaseController from "../baseController";
import { Request, Response } from "express";
import ICoordinationServices from "@/application/interfaces/iCoordinationServices";
import ControllerExceptionThrowHelper from "@/api/helpers/controllerExceptionThrowHelper";
import { ResponseBuilder } from "@/api/helpers/responseBuilder";

@injectable()
class GetAllCoordinationsController implements BaseController {
    constructor(
        @inject("CoordinationServices")
        private readonly coordinationServices: ICoordinationServices
    ) { }
    async Handle(req: Request, res: Response): Promise<Response> {
        try {
            const result = await this.coordinationServices.GetAllAsync()
            return res.status(200).json(ResponseBuilder.success("Coordinations retrieved successfully", "COORDINATIONS_LIST", 200, result))
        } catch (ex) {
            return ControllerExceptionThrowHelper.Throw(res, ex)
        }
    }
}
export default GetAllCoordinationsController
