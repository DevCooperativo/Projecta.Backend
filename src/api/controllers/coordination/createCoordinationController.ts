import { inject, injectable } from "tsyringe";
import BaseController from "../baseController";
import { Request, Response } from "express";
import ICoordinationServices from "@/application/interfaces/iCoordinationServices";
import { CoordinationDTO } from "@/application/dtos/coordinationDTO";
import ControllerExceptionThrowHelper from "@/api/helpers/controllerExceptionThrowHelper";
import { ResponseBuilder } from "@/api/helpers/responseBuilder";

@injectable()
class CreateCoordinationController implements BaseController {
    constructor(
        @inject("CoordinationServices")
        private readonly coordinationServices: ICoordinationServices
    ) { }
    async Handle(req: Request, res: Response): Promise<Response> {
        try {
            const { area, block, description } = req.body
            const coordinationDTO: CoordinationDTO = { area, block, description } as CoordinationDTO
            const result = await this.coordinationServices.CreateAsync(coordinationDTO)
            return res.status(200).json(ResponseBuilder.success("Coordination created successfully", "COORDINATION_CREATED", 200, result))
        } catch (ex) {
            return ControllerExceptionThrowHelper.Throw(res, ex)
        }
    }
}
export default CreateCoordinationController
