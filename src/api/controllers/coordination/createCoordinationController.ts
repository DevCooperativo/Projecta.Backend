import { inject, injectable } from "tsyringe";
import BaseController from "../baseController";
import { Request, Response } from "express";
import ControllerExceptionThrowHelper from "api/helpers/controllerExceptionThrowHelper";
import ICoordinationServices from "application/interfaces/iCoordinationServices";
import { CoordinationDTO } from "application/dtos/coordinationDTO";
import CheckRequestPropertiesHelper from "api/helpers/checkRequestPropertiesHelper";

@injectable()
class CreateCoordinationController implements BaseController {
    constructor(
        @inject("CoordinationServices")
        private readonly coordinationServices: ICoordinationServices
    ) { }
    async Handle(req: Request, res: Response) {
        try {
            const { area, block, description } = req.body
            CheckRequestPropertiesHelper.CheckRequired({ area, block, description })
            const coordinationDTO: CoordinationDTO = { area, block, description } as CoordinationDTO
            const result = await this.coordinationServices.CreateAsync(coordinationDTO)
            return res.status(200).json(result)
        } catch (ex) {
            return ControllerExceptionThrowHelper.Throw(res, ex)
        }
    }
}
export default CreateCoordinationController
