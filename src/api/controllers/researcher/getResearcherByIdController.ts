import { NextFunction, Request, Response } from "express";
import BaseController from "../baseController";
import { inject, injectable } from "tsyringe";
import IResearcherServices from "@/application/interfaces/iResearcherServices";
import ControllerExceptionThrowHelper from "@/api/helpers/controllerExceptionThrowHelper";
import { ResponseBuilder } from "@/api/helpers/responseBuilder";

@injectable()
class GetResearcherByIdController implements BaseController {
    constructor(
        @inject("ResearcherServices")
        private readonly researcherServices: IResearcherServices
    ) { }
    async Handle(req: Request, res: Response): Promise<Response>{
        const { id } = req.params
        try {
            const result = await this.researcherServices.GetByIdAsync(id as unknown as number)
            return res.status(200).json(ResponseBuilder.success("Success", "OK", 200, result))
        } catch (ex) {
            return ControllerExceptionThrowHelper.Throw(res, ex)
        }
    }
}
export default GetResearcherByIdController
