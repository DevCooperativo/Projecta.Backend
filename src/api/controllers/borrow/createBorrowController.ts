import { Request, Response } from "express";
import BaseController from "../baseController";
import { inject, injectable } from "tsyringe";
import ControllerExceptionThrowHelper from "@/api/helpers/controllerExceptionThrowHelper";
import { IBorrowServices } from "@/application/interfaces/iBorrowServices";
import { CreateBorrowInputDTO } from "@/application/dtos/borrow/createBorrowInputDTO";

@injectable()
export class CreateBorrowController extends BaseController {
    constructor(
        @inject("BorrowServices")
        private readonly borrowServices: IBorrowServices
    ) {
        super()
    }
    async Handle(req: Request, res: Response): Promise<Response>{ 
        try {
            const { equipmentId, borrowDate, studentId, professorId } = req.body || {}
            const dto = new CreateBorrowInputDTO(equipmentId, borrowDate, studentId, professorId)
            const result = await this.borrowServices.CreateAsync(dto)
            return res.status(201).json({ message: "Empréstimo criado com sucesso", data: result })
        } catch (ex) {
            return ControllerExceptionThrowHelper.Throw(res, ex)
        }
    }
}