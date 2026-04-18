import { NextFunction, Request, Response } from "express";
import BaseController from "../baseController";
import { inject, injectable } from "tsyringe";
import IProjectServices from "application/interfaces/iProjectServices";
import CheckRequestPropertiesHelper from "api/helpers/checkRequestPropertiesHelper";

@injectable()
class DeleteProjectController implements BaseController {
    constructor(
        @inject("ProjectServices")
        private readonly projectServices: IProjectServices
    ) { }
    async Handle(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params as unknown as { id: number }
            CheckRequestPropertiesHelper.CheckRequired({ id })
            const result = await this.projectServices.DeleteAsync(id)
            return res.status(200).json({ message: "Project successfully deleted!" })
        } catch (ex) {
            next(ex)
        }
    }
}
export default DeleteProjectController
