import { inject, injectable } from "tsyringe";
import BaseController from "../baseController";
import { Request, Response } from "express";
import ControllerExceptionThrowHelper from "@/api/helpers/controllerExceptionThrowHelper";
import { IBorrowServices } from "@/application/interfaces/iBorrowServices";
import { ReturnBorrowInputDTO } from "@/application/dtos/borrow/returnBorrowInputDTO";
import { ResponseBuilder } from "@/api/helpers/responseBuilder";

@injectable()
export class ReturnBorrowController implements BaseController {
    constructor(
        @inject("BorrowServices")
        private readonly borrowServices: IBorrowServices
    ) { }
    async Handle(req: Request, res: Response): Promise<Response> {
        try {
            const { borrowId } = req.params as { borrowId: string }
            const inputDto = new ReturnBorrowInputDTO(parseInt(borrowId))
            const result = await this.borrowServices.ReturnBorrowAsync(inputDto)
            if (!result)
                return res.status(400).json(ResponseBuilder.fail("An error occurred while trying to return the borrow. Check the information and try again", "warn", "RETURN_FAILED", 400));
            return res.status(200).json(ResponseBuilder.success("Borrow returned successfully", "BORROW_RETURNED", 200, undefined));
        } catch (ex) {
            return ControllerExceptionThrowHelper.Throw(res, ex);
        }
    }
}
