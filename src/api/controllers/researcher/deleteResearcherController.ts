import { Request, Response } from "express";
import BaseController from "../baseController";
import ControllerExceptionThrowHelper from "api/helpers/controllerExceptionThrowHelper";
import { inject, injectable } from "tsyringe";
import IResearcherServices from "application/interfaces/iResearcherServices";
import CheckRequestPropertiesHelper from "api/helpers/checkRequestPropertiesHelper";

@injectable()
class DeleteResearcherController implements BaseController {
    constructor(
        @inject("ResearcherServices")
        private readonly researcherServices: IResearcherServices
    ) { }
    async Handle(req: Request, res: Response) {
        try {
            const { id } = req.params as unknown as { id: number }
            CheckRequestPropertiesHelper.CheckRequired({ id })
            const result = await this.researcherServices.DeleteAsync(id)
            return res.status(200).json({ message: "Researcher successfully deleted!" })
        } catch (ex) {
            return ControllerExceptionThrowHelper.Throw(res, ex)
        }
    }
}
export default DeleteResearcherController
