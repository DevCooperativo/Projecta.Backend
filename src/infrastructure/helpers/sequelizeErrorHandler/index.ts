import { SequelizeErrorName } from "@/infrastructure/enums/sequelizeErrorName";
import { Error as SequelizeError } from "sequelize";
export const SequelizeErrorHandler = () => {
    const throwNormalizedSequelizeError = (error: unknown) => {
        if (error instanceof SequelizeError) {
            switch (error.name) {
                case SequelizeErrorName.SEQUELIZEDATABASEERROR:
                    console.error(`❌ Database error occurred. ${error.message} ❌`)
                    break;
                case SequelizeErrorName.VALIDATIONERROR:
                    console.error("❌ Validation error occurred. ❌")
                    break;
                case SequelizeErrorName.UNIQUECONSTRAINTERROR:
                    console.error("❌ Unique constraint error occurred. ❌")
                    break;
                default:
                    console.error(`❌ An unexpected Sequelize error occurred: ${error.name} ❌`)
                    console.log(error.message)
                    console.log(`=`.repeat(10))
            }
            return error;
        }
    }
    return { throwNormalizedSequelizeError }
}