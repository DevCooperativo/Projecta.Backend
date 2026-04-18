import { NextFunction, Request, Response } from "express";
import BaseController from "../baseController";
import { inject, injectable } from "tsyringe";
import ICoordinatorServices from "application/interfaces/iCoordinatorServices";

@injectable()
class GetAllCoordinatorsController implements BaseController {
    constructor(
        @inject("CoordinatorServices")
        private readonly coordinatorServices: ICoordinatorServices
    ) { }
    async Handle(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.coordinatorServices.GetAllAsync()
            return res.status(200).json(result)
        } catch (ex) {
            next(ex)
        }
    }
}
export default GetAllCoordinatorsController
