import { inject, injectable } from "tsyringe";
import BaseController from "../baseController";
import { Request, Response } from "express";
import ControllerExceptionThrowHelper from "@/api/helpers/controllerExceptionThrowHelper";
import { IBorrowServices } from "@/application/interfaces/iBorrowServices";
import { ReturnBorrowInputDTO } from "@/application/dtos/borrow/returnBorrowInputDTO";

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
                return res.status(400).json({ message: "An error occured while trying to return the borrow. Check the informations and try again" });
            return res.status(200).json({ message: "Borrow was successfully returned" });
        } catch (ex) {
            return ControllerExceptionThrowHelper.Throw(res, ex);
        }
    }
}
