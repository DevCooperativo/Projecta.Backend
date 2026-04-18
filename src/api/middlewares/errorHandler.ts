import { NextFunction, Request, Response } from "express";
import ApplicationException from "application/exceptions/applicationException";
import DomainException from "domain/exceptions/domainException";
import ApiException from "api/exceptions/apiException";
import InfrastructureException from "infrastructure/exceptions/infrastructureException";
import { InfrastructureExceptionName } from "infrastructure/exceptions/constants/infrastructureExceptionName";

function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction): void {
    if (err instanceof DomainException) {
        res.status(err.code).json({ name: err.name, message: err.message })
    } else if (err instanceof ApplicationException) {
        res.status(err.code).json({ name: err.name, message: err.message })
    } else if (err instanceof ApiException) {
        res.status(err.code).json(err.BuildJsonContent())
    } else if (err instanceof InfrastructureException) {
        res.status(err.code).json({ name: err.name, message: err.message })
    } else if (err instanceof TypeError) {
        res.status(400).json({ name: "TYPE_ERROR", message: err.message })
    } else if (err instanceof Error) {
        switch (err.name) {
            case "SequelizeUniqueConstraintError":
                res.status(409).json({ name: InfrastructureExceptionName.CONSTRAINT_ERROR, message: "An unique constraint violation made your request fail. Check the data and try again." })
                break
            case "SequelizeForeignKeyConstraintError":
                res.status(409).json({ name: InfrastructureExceptionName.CONSTRAINT_ERROR, message: "This record cannot be deleted or modified because it is referenced by other records." })
                break
            default:
                res.status(500).json({ name: err.name ?? "INTERNAL_SERVER_ERROR", message: err.message ?? "An error occurred on our side. Please, contact the support team" })
        }
    } else {
        res.status(500).json({ name: "INTERNAL_SERVER_ERROR", message: "An error occurred on our side. Please, contact the support team" })
    }
}

export default errorHandler
