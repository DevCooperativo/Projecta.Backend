import { inject, injectable } from "tsyringe";
import BaseController from "../baseController";
import { Request, Response } from "express";
import ControllerExceptionThrowHelper from "@/api/helpers/controllerExceptionThrowHelper";
import { IBorrowServices } from "@/application/interfaces/iBorrowServices";
import { ReturnBorrowInputDTO } from "@/application/dtos/borrow/returnBorrowInputDTO";
import ApiException from "@/api/exceptions/apiException";
import { ApiExceptionNames } from "@/api/constants/apiExceptionNames";

@injectable()
export class ReturnBorrowController implements BaseController {
    constructor(
        @inject("BorrowServices")
        private readonly borrowServices: IBorrowServices
    ) { }
    async Handle(req: Request, res: Response): Promise<Response> {
        try {
            const { borrowId } = req.params as { borrowId: string }
            const user = req.user
            if (!user)
                throw new ApiException(ApiExceptionNames.UNAUTHORIZED, "You are not authenticated in the system")
            const inputDto = new ReturnBorrowInputDTO(user.email, user.userType, parseInt(borrowId));
            const result = await this.borrowServices.ReturnBorrowAsync(inputDto)
            if (!result)
                return res.status(400).json({ message: "An error occured while trying to return the borrow. Check the informations and try again" });
            return res.status(200).json({ message: "Borrow was successfully returned" });
        } catch (ex) {
            return ControllerExceptionThrowHelper.Throw(res, ex);
        }
    }

}