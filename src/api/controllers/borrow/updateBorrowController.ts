import { inject, injectable } from "tsyringe";
import BaseController from "../baseController";
import { Request, Response } from "express";
import { IBorrowServices } from "@/application/interfaces/iBorrowServices";
import { UpdateBorrowInputDTO } from "@/application/dtos/borrow/updateBorrowInputDTO";
import ControllerExceptionThrowHelper from "@/api/helpers/controllerExceptionThrowHelper";
import { ResponseBuilder } from "@/api/helpers/responseBuilder";

@injectable()
export class UpdateBorrowController implements BaseController {
    constructor(
        @inject("BorrowServices")
        private readonly borrowServices: IBorrowServices
    ) { }
    async Handle(req: Request, res: Response): Promise<Response> {
        try {
            const { equipmentId, borrowDate, isStillBorrowed, studentId, professorId, returnDate } = req.body
            const { id } = req.params as unknown as { id: number }
            const dto = new UpdateBorrowInputDTO(equipmentId, borrowDate, isStillBorrowed, studentId, professorId, returnDate)
            const result = await this.borrowServices.UpdateAsync(id, dto)
            return res.status(200).json(ResponseBuilder.success("Borrow updated successfully", "BORROW_UPDATED", 200, result))
        } catch (ex) {
            return ControllerExceptionThrowHelper.Throw(res, ex)
        }
    }
}
