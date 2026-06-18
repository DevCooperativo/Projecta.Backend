import { inject, injectable } from "tsyringe";
import BaseController from "../baseController";
import { Request, Response } from "express";
import IAdministratorServices from "@/application/interfaces/iAdministratorServices";
import { CreateAdministratorInputDTO } from "@/application/dtos/administrator/createAdministratorInputDTO";
import ControllerExceptionThrowHelper from "@/api/helpers/controllerExceptionThrowHelper";
import { ResponseBuilder } from "@/api/helpers/responseBuilder";

@injectable()
class CreateAdministratorController implements BaseController {
    constructor(
        @inject("AdministratorServices")
        private readonly administratorServices: IAdministratorServices
    ) { }
    async Handle(req: Request, res: Response): Promise<Response>{
        try {
            const { name, email } = req.body
            const dto = new CreateAdministratorInputDTO(name, email)
            const result = await this.administratorServices.CreateAsync(dto)
            return res.status(201).json(ResponseBuilder.success("Administrator created successfully", "ADMINISTRATOR_CREATED", 201, result))
        } catch (ex) {
            return ControllerExceptionThrowHelper.Throw(res, ex)
        }
    }
}
export default CreateAdministratorController
