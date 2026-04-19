import { NextFunction, Request, Response } from "express";
import BaseController from "../baseController";
import { inject, injectable } from "tsyringe";
import IResearcherServices from "@/application/interfaces/iResearcherServices";
import ControllerExceptionThrowHelper from "@/api/helpers/controllerExceptionThrowHelper";

@injectable()
class DeleteResearcherController implements BaseController {
    constructor(
        @inject("ResearcherServices")
        private readonly researcherServices: IResearcherServices
    ) { }
    async Handle(req: Request, res: Response): Promise<Response>{
        try {
            const { id } = req.params as unknown as { id: number }
            const result = await this.researcherServices.DeleteAsync(id)
            return res.status(200).json({ message: "Researcher successfully deleted!" })
        } catch (ex) {
            return ControllerExceptionThrowHelper.Throw(res, ex)
        }
    }
}
export default DeleteResearcherController
