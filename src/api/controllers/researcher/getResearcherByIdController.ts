import { Request, Response } from "express";
import BaseController from "../baseController";
import ControllerExceptionThrowHelper from "api/helpers/controllerExceptionThrowHelper";
import { inject, injectable } from "tsyringe";
import IResearcherServices from "application/interfaces/iResearcherServices";

@injectable()
class GetResearcherByIdController implements BaseController {
    constructor(
        @inject("ResearcherServices")
        private readonly researcherServices: IResearcherServices
    ) { }
    async Handle(req: Request, res: Response) {
        const { id } = req.params
        try {
            const result = await this.researcherServices.GetByIdAsync(id as unknown as number)
            return res.status(200).json(result)
        } catch (ex) {
            return ControllerExceptionThrowHelper.Throw(res, ex)
        }
    }
}
export default GetResearcherByIdController
