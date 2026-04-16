import { Request, Response } from "express";
import BaseController from "../baseController";
import { injectable } from "tsyringe";
import ControllerExceptionThrowHelper from "api/helpers/controllerExceptionThrowHelper";
import { CheckData } from "api/helpers/checkRequestPropertiesHelper";

@injectable()
export class CreateBorrowController extends BaseController {
    async Handle(req: Request, res: Response): Promise<Response> {
        try {
            const { equipmentId, studentId, professorId } = req.body || {}
            CheckData({
                equipmentId: { value: equipmentId, type: "number", required: true },
                studentId: { value: studentId, type: "number", required: false },
                professorId: { value: professorId, type: "number", required: false }
            })
            
            return res.status(201).json({ message: "Empréstimo criado com sucesso" })
        } catch (ex) {
            return ControllerExceptionThrowHelper.Throw(res, ex)
        }
    }
}