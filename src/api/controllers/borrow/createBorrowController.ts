import { Request, Response } from "express";
import BaseController from "../baseController";
import { inject, injectable } from "tsyringe";
import ControllerExceptionThrowHelper from "@/api/helpers/controllerExceptionThrowHelper";
import { IBorrowServices } from "@/application/interfaces/iBorrowServices";
import { CreateBorrowInputDTO } from "@/application/dtos/borrow/createBorrowInputDTO";
import ApiException from "@/api/exceptions/apiException";
import { ApiExceptionNames } from "@/api/constants/apiExceptionNames";

@injectable()
export class CreateBorrowController extends BaseController {
    constructor(
        @inject("BorrowServices")
        private readonly borrowServices: IBorrowServices
    ) {
        super()
    }
    async Handle(req: Request, res: Response): Promise<Response> {
        try {
            const { equipmentId, borrowDate } = req.body || {}
            const user = req.user;
            if (!user)
                throw new ApiException(ApiExceptionNames.UNAUTHORIZED, "User not authenticated on the server");
            const dto = new CreateBorrowInputDTO(equipmentId, borrowDate, user.email, user.userType)
            const result = await this.borrowServices.CreateAsync(dto)
            return res.status(201).json({ message: "Empréstimo criado com sucesso", data: result })
        } catch (ex) {
            return ControllerExceptionThrowHelper.Throw(res, ex)
        }
    }
}