import InfrastructureException from "@/infrastructure/exceptions/infrastructureException";
import { InfrastructureExceptionName } from "@/infrastructure/exceptions/constants/infrastructureExceptionName";
import {
    ValidationError,
    UniqueConstraintError,
    ForeignKeyConstraintError,
    DatabaseError,
    Error as SequelizeError
} from "sequelize";

export const throwNormalizedSequelizeError = (error: unknown): void => {
    if (!(error instanceof SequelizeError)) return;

    if (error instanceof UniqueConstraintError) {
        throw new InfrastructureException(
            InfrastructureExceptionName.CONSTRAINT_ERROR,
            "An unique constraint violation made your request fail. Check the data and try again.",
            409,
            error.stack,
            error
        )
    }

    if (error instanceof ForeignKeyConstraintError) {
        throw new InfrastructureException(
            InfrastructureExceptionName.CONSTRAINT_ERROR,
            "This record cannot be deleted or modified because it is referenced by other records.",
            409,
            error.stack,
            error
        )
    }

    if (error instanceof ValidationError) {
        const details = error.errors.map(e => `${e.path}: ${e.message}`).join("; ")
        throw new InfrastructureException(
            InfrastructureExceptionName.VALIDATION_ERROR,
            details || error.message,
            422,
            error.stack,
            error
        )
    }

    if (error instanceof DatabaseError) {
        throw new InfrastructureException(
            InfrastructureExceptionName.PERSISTENCE_ERROR,
            "A database error occurred. Please contact the support team.",
            500,
            error.stack,
            error
        )
    }

    throw new InfrastructureException(
        InfrastructureExceptionName.PERSISTENCE_ERROR,
        "An unexpected persistence error occurred. Please contact the support team.",
        500,
        (error as Error).stack,
        error
    )
}
