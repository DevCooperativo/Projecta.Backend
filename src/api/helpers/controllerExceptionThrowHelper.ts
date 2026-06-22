import ApplicationException from "@/application/exceptions/applicationException";
import DomainException from "@/domain/exceptions/domainException";
import { Response } from "express";
import ApiException from "../exceptions/apiException";
import InfrastructureException from "@/infrastructure/exceptions/infrastructureException";
import { ResponseBuilder, ResponseDetail } from "./responseBuilder";

class ControllerExceptionThrowHelper {
    static Throw(res: Response, ex: unknown) {
        console.log(ex)
        if (ex instanceof DomainException) {
            return res.status(400).json(ResponseBuilder.fail(ex.message, 'warn', ex.name, 400))
        }
        else if (ex instanceof TypeError) {
            return res.status(400).json(ResponseBuilder.fail(ex.message, 'warn', "TYPE_ERROR", 400))
        }
        else if (ex instanceof ApplicationException) {
            const type = ex.code >= 500 ? 'error' : 'info'
            return res.status(ex.code).json(ResponseBuilder.fail(ex.message, type, ex.name, ex.code))
        }
        else if (ex instanceof ApiException) {
            const type = ex.code >= 500 ? 'error' : 'warn'
            const details = ex.validationInfo
                ? (Object.entries(ex.validationInfo).map(([field, reason]) => ({ field, reason: String(reason) } as ResponseDetail)))
                : undefined
            return res.status(ex.code).json(ResponseBuilder.fail(ex.message, type, ex.name, ex.code, details))
        }
        else if (ex instanceof InfrastructureException) {
            const type = ex.code >= 500 ? 'error' : 'warn'
            return res.status(ex.code).json(ResponseBuilder.fail(ex.message, type, ex.name, ex.code))
        }
        else if (ex instanceof Error) {
            return res.status(500).json(ResponseBuilder.fail(
                ex.message.replace("\n", "; ") ?? "An error occurred on our side. Please, contact the support team",
                'error', ex.name ?? "INTERNAL_SERVER_ERROR", 500
            ))
        }
        return res.status(500).json(ResponseBuilder.fail(
            "An error occurred on our side. Please, contact the support team",
            'error', "INTERNAL_SERVER_ERROR", 500
        ))
    }
}
export default ControllerExceptionThrowHelper
