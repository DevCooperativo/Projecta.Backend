import { inject, injectable } from "tsyringe";
import BaseController from "../baseController";
import { NextFunction, Request, Response } from "express";
import ICoordinationServices from "application/interfaces/iCoordinationServices";

@injectable()
class GetAllCoordinationsController implements BaseController {
    constructor(
        @inject("CoordinationServices")
        private readonly coordinationServices: ICoordinationServices
    ) { }
    async Handle(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.coordinationServices.GetAllAsync()
            return res.status(200).json(result)
        } catch (ex) {
            next(ex)
        }
    }
}
export default GetAllCoordinationsController
