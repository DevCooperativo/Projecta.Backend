import { inject, injectable } from "tsyringe";
import BaseController from "../baseController";
import { Request, Response } from "express";
import { IBorrowServices } from "@/application/interfaces/iBorrowServices";
import ControllerExceptionThrowHelper from "@/api/helpers/controllerExceptionThrowHelper";
import { GetAllBorrowInputDTO } from "@/application/dtos/borrow/getAllBorrowInputDTO";
import { ResponseBuilder } from "@/api/helpers/responseBuilder";

@injectable()
export class GetAllBorrowsController implements BaseController {
    constructor(
        @inject("BorrowServices")
        private readonly borrowServices: IBorrowServices
    ) { }
    async Handle(req: Request, res: Response): Promise<Response> {
        try {
            const { q, borrowerId, borrowerType, startPeriod, endPeriod } = req.query as {
                q?: string
                borrowerId?: string
                borrowerType?: 'professor' | 'student'
                startPeriod?: string
                endPeriod?: string
            }
            const user = borrowerId && borrowerType
                ? { id: parseInt(borrowerId), type: borrowerType }
                : undefined
            const result = await this.borrowServices.GetAllAsync(new GetAllBorrowInputDTO(
                q,
                user,
                startPeriod ? new Date(startPeriod) : undefined,
                endPeriod ? new Date(endPeriod) : undefined
            ))
            return res.status(200).json(ResponseBuilder.success("Borrows retrieved successfully", "BORROWS_LIST", 200, result))
        } catch (ex) {
            return ControllerExceptionThrowHelper.Throw(res, ex)
        }
    }
}
