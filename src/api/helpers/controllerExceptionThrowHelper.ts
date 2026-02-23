import ApplicationException from "application/exceptions/applicationException";
import DomainException from "domain/exceptions/domainException";
import { Response } from "express";
import ApiException from "../exceptions/apiException";
import InfrastructureExceptionNameEnum from "@shared/enums/exceptions/infrastructureExceptionNameEnum";
import InfrastructureException from "infrastructure/exceptions/infrastructureException";

class ControllerExceptionThrowHelper {
    static Throw(res: Response, ex: unknown) {
        if (ex instanceof DomainException) {
            return res.status(ex.code).json({ name: ex.name, message: ex.message })
        }
        else if (ex instanceof TypeError) {
            return res.status(400).json({ name: "TYPE_ERROR", message: ex.message })
        }
        else if (ex instanceof ApplicationException) {
            return res.status(ex.code).json({ name: ex.name, message: ex.message })
        }
        else if (ex instanceof ApiException) {
            return res.status(ex.code).json({ name: ex.name, message: ex.message })
        }
        else if (ex instanceof InfrastructureException) {
            return res.status(ex.code).json({ name: ex.name, message: ex.message })
        }
        else if (ex instanceof Error) {
            switch (ex.name) {
                case "SequelizeUniqueConstraintError":
                    return res.status(409).json({ name: InfrastructureExceptionNameEnum.CONSTRAINT_ERROR, message: "An unique constraint violation made your request fail. Check the data and try again. If you think this might be a mistake, contact the support team" })

                default:
                    return res.status(500).json({ name: "INTERNAL_SERVER_ERROR", message: "An error occurred on our side. Please, contact the support team" })
            }
        }
        return res.status(500).json({ name: "INTERNAL_SERVER_ERROR", message: "An error occurred on our side. Please, contact the support team" })
        //     else if (ex instanceof RequestValidationException) {

        //     }
    }
}
export default ControllerExceptionThrowHelper