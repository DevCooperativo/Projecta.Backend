import { Request, Response } from "express";
import BaseController from "../baseController";
import { inject, injectable } from "tsyringe";
import ControllerExceptionThrowHelper from "@/api/helpers/controllerExceptionThrowHelper";
import { IBorrowServices } from "@/application/interfaces/iBorrowServices";
import { CreateBorrowInputDTO } from "@/application/dtos/borrow/createBorrowInputDTO";
import { ResponseBuilder } from "@/api/helpers/responseBuilder";

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
            const { equipmentId, borrowDate, returnDate } = req.body || {}
            const dto = new CreateBorrowInputDTO(equipmentId, borrowDate, returnDate)
            const result = await this.borrowServices.CreateAsync(dto)
            return res.status(201).json(ResponseBuilder.success("Borrow created successfully", "BORROW_CREATED", 201, result))
        } catch (ex) {
            return ControllerExceptionThrowHelper.Throw(res, ex)
        }
    }
}
