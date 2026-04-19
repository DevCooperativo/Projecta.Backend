import { NextFunction, Request, Response } from "express";
import BaseController from "../baseController";
import { inject, injectable } from "tsyringe";
import ICoordinatorServices from "@/application/interfaces/iCoordinatorServices";
import CoordinatorDTO from "@/application/dtos/coordinatorDTO";
import ControllerExceptionThrowHelper from "@/api/helpers/controllerExceptionThrowHelper";

@injectable()
class UpdateCoordinatorController implements BaseController {
    constructor(
        @inject("CoordinatorServices")
        private readonly coordinatorServices: ICoordinatorServices
    ) { }
    async Handle(req: Request, res: Response): Promise<Response>{
        try {
            const { area, startDate, endDate, professorId, projectId } = req.body
            const { id } = req.params as unknown as { id: number }
            const coordinatorDTO: CoordinatorDTO = { area, startDate, endDate, professorId, projectId } as CoordinatorDTO
            const result = await this.coordinatorServices.UpdateAsync(id, coordinatorDTO)
            return res.status(200).json(result)
        } catch (ex) {
            return ControllerExceptionThrowHelper.Throw(res, ex)
        }
    }
}
export default UpdateCoordinatorController
