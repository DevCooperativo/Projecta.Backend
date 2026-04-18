import { NextFunction, Request, Response } from "express";
import BaseController from "../baseController";
import { inject, injectable } from "tsyringe";
import IProjectServices from "application/interfaces/iProjectServices";

@injectable()
class GetProjectByIdController implements BaseController {
    constructor(
        @inject("ProjectServices")
        private readonly projectServices: IProjectServices
    ) { }
    async Handle(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params
        try {
            const result = await this.projectServices.GetByIdAsync(id as unknown as number)
            return res.status(200).json(result)
        } catch (ex) {
            next(ex)
        }
    }
}
export default GetProjectByIdController
