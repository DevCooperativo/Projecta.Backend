import { Request, Response } from "express";
import BaseController from "../baseController";
import { inject, injectable } from "tsyringe";
import IProjectServices from "@/application/interfaces/iProjectServices";
import ControllerExceptionThrowHelper from "@/api/helpers/controllerExceptionThrowHelper";
import { ResponseBuilder } from "@/api/helpers/responseBuilder";

@injectable()
class GetAllProjectsController implements BaseController {
    constructor(
        @inject("ProjectServices")
        private readonly projectServices: IProjectServices
    ) { }
    async Handle(req: Request, res: Response): Promise<Response> {
        try {
            const { categoryId, laboratoryId, name } = req.query
            const filters = {
                categoryId: categoryId ? Number(categoryId) : undefined,
                laboratoryId: laboratoryId ? Number(laboratoryId) : undefined,
                name: name as string | undefined,
            }
            const result = await this.projectServices.GetAllAsync(filters)
            return res.status(200).json(ResponseBuilder.success("Success", "OK", 200, result))
        } catch (ex) {
            return ControllerExceptionThrowHelper.Throw(res, ex)
        }
    }
}
export default GetAllProjectsController
