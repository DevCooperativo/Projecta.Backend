import { Request, Response } from "express";
import BaseController from "../baseController";
import ControllerExceptionThrowHelper from "api/helpers/controllerExceptionThrowHelper";
import { inject, injectable } from "tsyringe";
import IProjectServices from "application/interfaces/iProjectServices";

@injectable()
class GetAllProjectsController implements BaseController {
    constructor(
        @inject("ProjectServices")
        private readonly projectServices: IProjectServices
    ) { }
    async Handle(req: Request, res: Response) {
        try {
            const result = await this.projectServices.GetAllAsync()
            return res.status(200).json(result)
        } catch (ex) {
            return ControllerExceptionThrowHelper.Throw(res, ex)
        }
    }
}
export default GetAllProjectsController
