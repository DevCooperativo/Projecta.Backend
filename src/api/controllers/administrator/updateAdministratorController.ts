import { inject, injectable } from "tsyringe";
import BaseController from "../baseController";
import { Request, Response } from "express";
import IAdministratorServices from "@/application/interfaces/iAdministratorServices";
import { UpdateAdministratorInputDTO } from "@/application/dtos/administrator/updateAdministratorInputDTO";
import ControllerExceptionThrowHelper from "@/api/helpers/controllerExceptionThrowHelper";
import ApiException from "@/api/exceptions/apiException";
import { ApiExceptionNames } from "@/api/constants/apiExceptionNames";
import { ResponseBuilder } from "@/api/helpers/responseBuilder";

@injectable()
class UpdateAdministratorController implements BaseController {
    constructor(
        @inject("AdministratorServices")
        private readonly administratorServices: IAdministratorServices
    ) { }
    async Handle(req: Request, res: Response): Promise<Response> {
        try {
            const { name } = req.body
            const { id } = req.params as unknown as { id: number }
            const user = req.user
            if (!user)
                throw new ApiException(ApiExceptionNames.UNAUTHORIZED, "User is not logged in")
            const dto = new UpdateAdministratorInputDTO(id, user.email, user.userType, name)
            const result = await this.administratorServices.UpdateAsync(dto)
            return res.status(200).json(ResponseBuilder.success("Administrator updated successfully", "ADMINISTRATOR_UPDATED", 200, result))
        } catch (ex) {
            return ControllerExceptionThrowHelper.Throw(res, ex)
        }
    }
}
export default UpdateAdministratorController
