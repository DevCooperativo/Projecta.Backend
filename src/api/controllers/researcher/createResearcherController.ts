import { NextFunction, Request, Response } from "express";
import BaseController from "../baseController";
import { inject, injectable } from "tsyringe";
import IResearcherServices from "@/application/interfaces/iResearcherServices";
import ResearcherDTO from "@/application/dtos/researcherDTO";
import ControllerExceptionThrowHelper from "@/api/helpers/controllerExceptionThrowHelper";

@injectable()
class CreateResearcherController implements BaseController {
    constructor(
        @inject("ResearcherServices")
        private readonly researcherServices: IResearcherServices
    ) { }
    async Handle(req: Request, res: Response): Promise<Response>{
        try {
            const { name, functionName, weeklyHours, startDate, projectId, studentId, professorId } = req.body
            const researcherDTO: ResearcherDTO = { name, functionName, weeklyHours, startDate, projectId, studentId, professorId } as ResearcherDTO
            const result = await this.researcherServices.CreateAsync(researcherDTO)
            return res.status(200).json(result)
        } catch (ex) {
            return ControllerExceptionThrowHelper.Throw(res, ex)
        }
    }
}
export default CreateResearcherController
