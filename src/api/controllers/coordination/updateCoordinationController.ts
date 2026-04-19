import { inject, injectable } from "tsyringe";
import BaseController from "../baseController";
import { NextFunction, Request, Response } from "express";
import ICoordinationServices from "@/application/interfaces/iCoordinationServices";
import { CoordinationDTO } from "@/application/dtos/coordinationDTO";
import ControllerExceptionThrowHelper from "@/api/helpers/controllerExceptionThrowHelper";

@injectable()
class UpdateCoordinationController implements BaseController {
    constructor(
        @inject("CoordinationServices")
        private readonly coordinationServices: ICoordinationServices
    ) { }
    async Handle(req: Request, res: Response): Promise<Response>{
        try {
            const { area, block, description } = req.body
            const { id } = req.params as unknown as { id: number }
            const coordinationDTO: CoordinationDTO = { area, block, description } as CoordinationDTO
            const result = await this.coordinationServices.UpdateAsync(id, coordinationDTO)
            return res.status(200).json(result)
        } catch (ex) {
            return ControllerExceptionThrowHelper.Throw(res, ex)
        }
    }
}
export default UpdateCoordinationController
