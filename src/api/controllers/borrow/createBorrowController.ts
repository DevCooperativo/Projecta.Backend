import { NextFunction, Request, Response } from "express";
import BaseController from "../baseController";
import { injectable } from "tsyringe";
import { CheckData } from "api/helpers/checkRequestPropertiesHelper";

@injectable()
export class CreateBorrowController extends BaseController {
    async Handle(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { equipmentId, studentId, professorId } = req.body || {}
            CheckData({
                equipmentId: { value: equipmentId, type: "number", required: true },
                studentId: { value: studentId, type: "number", required: false },
                professorId: { value: professorId, type: "number", required: false }
            })
            
            return res.status(201).json({ message: "Empréstimo criado com sucesso" })
        } catch (ex) {
            next(ex)
        }
    }
}