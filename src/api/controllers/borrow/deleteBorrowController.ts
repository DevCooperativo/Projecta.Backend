import { inject, injectable } from "tsyringe";
import BaseController from "../baseController";
import { Request, Response } from "express";
import { IBorrowServices } from "@/application/interfaces/iBorrowServices";
import ControllerExceptionThrowHelper from "@/api/helpers/controllerExceptionThrowHelper";

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
                return res.status(404).json({ message: "Borrow not found" })
            }
            return res.status(200).json({ message: "Borrow deleted successfully" })
        } catch (ex) {
            return ControllerExceptionThrowHelper.Throw(res, ex)
        }
    }
}
