import { inject, injectable } from "tsyringe";
import BaseController from "../baseController";
import { Request, Response } from "express";
import { IBorrowServices } from "@/application/interfaces/iBorrowServices";
import ControllerExceptionThrowHelper from "@/api/helpers/controllerExceptionThrowHelper";
import { ResponseBuilder } from "@/api/helpers/responseBuilder";

@injectable()
export class DeleteBorrowController implements BaseController {
    constructor(
        @inject("BorrowServices")
        private readonly borrowServices: IBorrowServices
    ) { }
    async Handle(req: Request, res: Response): Promise<Response>{
        try {
            const { id } = req.params as unknown as { id: number }
            const result = await this.borrowServices.DeleteAsync(id)
            if(!result) {
                return res.status(404).json(ResponseBuilder.fail("Borrow not found", "info", "NOT_FOUND", 404))
            }
            return res.status(200).json(ResponseBuilder.success("Borrow deleted successfully", "BORROW_DELETED", 200, undefined))
        } catch (ex) {
            return ControllerExceptionThrowHelper.Throw(res, ex)
        }
    }
}
