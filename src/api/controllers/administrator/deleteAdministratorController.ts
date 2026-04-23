import { inject, injectable } from "tsyringe";
import BaseController from "../baseController";
import { Request, Response } from "express";
import IAdministratorServices from "@/application/interfaces/iAdministratorServices";
import ControllerExceptionThrowHelper from "@/api/helpers/controllerExceptionThrowHelper";
import { DeleteAdministratorInputDTO } from "@/application/dtos/administrator/deleteAdministratorInputDTO";
import ApiException from "@/api/exceptions/apiException";
import { ApiExceptionNames } from "@/api/constants/apiExceptionNames";

@injectable()
class DeleteAdministratorController implements BaseController {
    constructor(
        @inject("AdministratorServices")
        private readonly administratorServices: IAdministratorServices
    ) { }
    async Handle(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params as unknown as { id: number }
            const user = req.user
            if (!user)
                throw new ApiException(ApiExceptionNames.UNAUTHORIZED, "User is not logged in")
            const dto = new DeleteAdministratorInputDTO(id, user.id)
            const result = await this.administratorServices.DeleteAsync(dto)
            if (!result) {
                return res.status(404).json({ message: "Administrator not found" })
            }
            return res.status(200).json({ message: "Administrator deleted successfully" })
        } catch (ex) {
            return ControllerExceptionThrowHelper.Throw(res, ex)
        }
    }
}
export default DeleteAdministratorController
