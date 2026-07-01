import { Request, Response } from "express"
import { inject, injectable } from "tsyringe"
import BaseController from "@/api/controllers/baseController"
import { IBorrowMetricsServices } from "@/application/interfaces/iBorrowMetricsServices"
import { ResponseBuilder } from "@/api/helpers/responseBuilder"
import ControllerExceptionThrowHelper from "@/api/helpers/controllerExceptionThrowHelper"

@injectable()
export class GetBorrowMetricsController extends BaseController {
    constructor(
        @inject("BorrowMetricsServices")
        private readonly borrowMetricsServices: IBorrowMetricsServices
    ) {
        super()
    }

    async Handle(req: Request, res: Response): Promise<Response> {
        try {
            const result = await this.borrowMetricsServices.GetOwnMetricsAsync()
            return res.status(200).json(
                ResponseBuilder.success("Borrow metrics retrieved successfully", "BORROW_METRICS", 200, result)
            )
        } catch (ex) {
            return ControllerExceptionThrowHelper.Throw(res, ex)
        }
    }
}
