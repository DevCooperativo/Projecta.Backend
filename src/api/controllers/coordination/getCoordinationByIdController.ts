import { inject, injectable } from "tsyringe";
import BaseController from "../baseController";
import { NextFunction, Request, Response } from "express";
import ICoordinationServices from "@/application/interfaces/iCoordinationServices";
import ControllerExceptionThrowHelper from "@/api/helpers/controllerExceptionThrowHelper";
import { ResponseBuilder } from "@/api/helpers/responseBuilder";

@injectable()
class GetCoordinationByIdController implements BaseController {
    constructor(
        @inject("CoordinationServices")
        private readonly coordinationServices: ICoordinationServices
    ) { }
    async Handle(req: Request, res: Response): Promise<Response>{
        try {
            const { id } = req.params as unknown as { id: number }
            const result = await this.coordinationServices.GetByIdAsync(id)
            return res.status(200).json(ResponseBuilder.success("Success", "OK", 200, result))
        } catch (ex) {
            return ControllerExceptionThrowHelper.Throw(res, ex)
        }
    }
}
export default GetCoordinationByIdController
