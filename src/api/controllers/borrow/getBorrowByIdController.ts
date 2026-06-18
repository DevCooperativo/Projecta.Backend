import { inject, injectable } from "tsyringe";
import BaseController from "../baseController";
import { Request, Response } from "express";
import { IBorrowServices } from "@/application/interfaces/iBorrowServices";
import ControllerExceptionThrowHelper from "@/api/helpers/controllerExceptionThrowHelper";
import { ResponseBuilder } from "@/api/helpers/responseBuilder";

@injectable()
export class GetBorrowByIdController implements BaseController {
    constructor(
        @inject("BorrowServices")
        private readonly borrowServices: IBorrowServices
    ) { }
    async Handle(req: Request, res: Response): Promise<Response>{
        try {
            const { id } = req.params as unknown as { id: number }
            const result = await this.borrowServices.GetByIdAsync(id)
            return res.status(200).json(ResponseBuilder.success("Borrow retrieved successfully", "BORROW_FOUND", 200, result))
        } catch (ex) {
            return ControllerExceptionThrowHelper.Throw(res, ex)
        }
    }
}
