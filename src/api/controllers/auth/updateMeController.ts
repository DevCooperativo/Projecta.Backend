import { Request, Response } from "express";
import BaseController from "../baseController";
import { inject, injectable } from "tsyringe";
import { IAuthServices } from "@/application/interfaces/iAuthServices";
import ControllerExceptionThrowHelper from "@/api/helpers/controllerExceptionThrowHelper";
import ApiException from "@/api/exceptions/apiException";
import { ApiExceptionNames } from "@/api/constants/apiExceptionNames";
import { ResponseBuilder } from "@/api/helpers/responseBuilder";
import { UpdateProfileInputDTO } from "@/application/dtos/auth/updateProfileInputDTO";

@injectable()
export class UpdateMeController extends BaseController {
    constructor(
        @inject("AuthServices")
        private readonly authServices: IAuthServices
    ) {
        super()
    }
    async Handle(req: Request, res: Response): Promise<Response> {
        try {
            const user = req.user
            if (!user)
                throw new ApiException(ApiExceptionNames.UNAUTHORIZED, "You are not authenticated")
            const { name, birthdate, registration, telephone } = req.body
            const dto = new UpdateProfileInputDTO(user.email, user.userType, name, birthdate, registration, telephone)
            const result = await this.authServices.UpdateProfile(dto)
            return res.status(200).json(
                ResponseBuilder.success("Profile updated successfully", "PROFILE_UPDATED", 200, { ...result })
            )
        } catch (ex) {
            return ControllerExceptionThrowHelper.Throw(res, ex)
        }
    }
}
