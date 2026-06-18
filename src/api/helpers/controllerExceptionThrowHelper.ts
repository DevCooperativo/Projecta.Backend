import ApplicationException from "@/application/exceptions/applicationException";
import DomainException from "@/domain/exceptions/domainException";
import { Response } from "express";
import ApiException from "../exceptions/apiException";
import InfrastructureException from "@/infrastructure/exceptions/infrastructureException";
import { InfrastructureExceptionName } from "@/infrastructure/exceptions/constants/infrastructureExceptionName";

class ControllerExceptionThrowHelper {
    static Throw(res: Response, ex: unknown) {
        console.log(ex)
        if (ex instanceof DomainException) {
            return res.status(400).json({ name: ex.name, message: ex.message })
        }
        else if (ex instanceof TypeError) {
            return res.status(400).json({ name: "TYPE_ERROR", message: ex.message })
        }
        else if (ex instanceof ApplicationException) {
            return res.status(ex.code).json({ name: ex.name, message: ex.message })
        }
        else if (ex instanceof ApiException) {
            return res.status(ex.code).json(ex.BuildJsonContent())
        }
        else if (ex instanceof InfrastructureException) {
            return res.status(ex.code).json({ name: ex.name, message: ex.message })
        }
        else if (ex instanceof Error) {
            switch (ex.name) {
                case "SequelizeUniqueConstraintError":
                    return res.status(409).json({ name: InfrastructureExceptionName.CONSTRAINT_ERROR, message: "An unique constraint violation made your request fail. Check the data and try again. If you think this might be a mistake, contact the support team" })
                case "SequelizeForeignKeyConstraintError":
                    return res.status(409).json({ name: InfrastructureExceptionName.CONSTRAINT_ERROR, message: "This record cannot be deleted or modified because it is referenced by other records." })

                default:
                    return res.status(500).json({ name: ex.name ?? "INTERNAL_SERVER_ERROR", message: ex.message.replace("\n", "; ") ?? "An error occurred on our side. Please, contact the support team" })
            }
        }
        return res.status(500).json({ name: "INTERNAL_SERVER_ERROR", message: "An error occurred on our side. Please, contact the support team" })
        //     else if (ex instanceof RequestValidationException) {

        //     }
    }
}
export default ControllerExceptionThrowHelper
