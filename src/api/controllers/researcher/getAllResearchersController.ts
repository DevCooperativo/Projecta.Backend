import { Request, Response } from "express";
import BaseController from "../baseController";
import ControllerExceptionThrowHelper from "api/helpers/controllerExceptionThrowHelper";
import { inject, injectable } from "tsyringe";
import IResearcherServices from "application/interfaces/iResearcherServices";

@injectable()
class GetAllResearchersController implements BaseController {
    constructor(
        @inject("ResearcherServices")
        private readonly researcherServices: IResearcherServices
    ) { }
    async Handle(req: Request, res: Response) {
        try {
            const result = await this.researcherServices.GetAllAsync()
            return res.status(200).json(result)
        } catch (ex) {
            return ControllerExceptionThrowHelper.Throw(res, ex)
        }
    }
}
export default GetAllResearchersController
