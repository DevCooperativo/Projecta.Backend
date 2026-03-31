import { Request, Response } from "express";
import BaseController from "../baseController";
import ControllerExceptionThrowHelper from "api/helpers/controllerExceptionThrowHelper";
import { inject, injectable } from "tsyringe";
import IProjectServices from "application/interfaces/iProjectServices";

@injectable()
class GetProjectByIdController implements BaseController {
    constructor(
        @inject("ProjectServices")
        private readonly projectServices: IProjectServices
    ) { }
    async Handle(req: Request, res: Response) {
        const { id } = req.params
        try {
            const result = await this.projectServices.GetByIdAsync(id as unknown as number)
            return res.status(200).json(result)
        } catch (ex) {
            return ControllerExceptionThrowHelper.Throw(res, ex)
        }
    }
}
export default GetProjectByIdController
