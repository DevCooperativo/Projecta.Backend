import { NextFunction, Request, Response } from "express";
import { IPayloadValidation } from "./validations/abstractions/iPayloadValidation";
import { RequestDataError, RequestDataErrorType } from "@/api/constants/requestDataError";

export const EnsureCorrectFieldsValidationMiddleware = (payload: IPayloadValidation) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const errors: Record<string, { type: RequestDataErrorType, error: string }> = {}

        const allowedFields = Object.keys(payload)
        const allFields = { ...req.body, ...req.params, ...req.query }
        console.log(allFields)
        for (const key in allFields) {
            if (!allowedFields.includes(key)) {
                errors[key] = { type: RequestDataError.INVALID_FIELDS, error: `The field ${key} is not allowed` }
            }
        }


        for (const key in payload) {
            const field = payload[key]
            const source = field.source === "params" ? req.params : req.body

            const value = source?.[key]

            if (field.required && (value === null || value === undefined || value === "")) {
                errors[key] = { type: RequestDataError.MISSING_REQUIRED_FIELD, error: `The field ${key} is a required field` }
                continue
            }

            if (!field.required && (value === null || value === undefined)) {
                continue
            }

            if (value !== undefined && value !== null && typeof value !== field.type) {
                errors[key] = { type: RequestDataError.INVALID_FIELD_TYPE, error: `The field ${key} must be of type ${field.type}` }
            }
        }

        for (const key in payload) {
            const field = payload[key]
            if (!field.crossValidation || errors[key]) continue

            const { field: targetField, condition } = field.crossValidation
            const source = field.source === "params" ? req.params : req.body
            const targetSource = payload[targetField]?.source === "params" ? req.params : req.body
            const value = source?.[key]
            const targetValue = targetSource?.[targetField]

            const valuePresent = value !== null && value !== undefined && value !== ""
            const targetPresent = targetValue !== null && targetValue !== undefined && targetValue !== ""

            switch (condition) {
                case "mustNotBePresentIf":
                    if (valuePresent && targetPresent)
                        errors[key] = { type: RequestDataError.CROSS_VALIDATION_FAILED, error: `The field ${key} must not be present when ${targetField} is present` }
                    break
                case "mustBePresentIf":
                    if (!valuePresent && targetPresent)
                        errors[key] = { type: RequestDataError.CROSS_VALIDATION_FAILED, error: `The field ${key} must be present when ${targetField} is present` }
                    break
                case "greaterThan":
                    if (valuePresent && targetPresent && value <= targetValue)
                        errors[key] = { type: RequestDataError.CROSS_VALIDATION_FAILED, error: `The field ${key} must be greater than ${targetField}` }
                    break
                case "lessThan":
                    if (valuePresent && targetPresent && value >= targetValue)
                        errors[key] = { type: RequestDataError.CROSS_VALIDATION_FAILED, error: `The field ${key} must be less than ${targetField}` }
                    break
                case "equals":
                    if (valuePresent && targetPresent && value !== targetValue)
                        errors[key] = { type: RequestDataError.CROSS_VALIDATION_FAILED, error: `The field ${key} must be equal to ${targetField}` }
                    break
                case "notEquals":
                    if (valuePresent && targetPresent && value === targetValue)
                        errors[key] = { type: RequestDataError.CROSS_VALIDATION_FAILED, error: `The field ${key} must not be equal to ${targetField}` }
                    break
            }
        }

        if (Object.keys(errors).length > 0) {
            res.status(400).json({
                name: "BAD_REQUEST",
                message: "The following properties must be fixed on your request",
                validationInfo: errors
            })
            return
        }
        next()

    }
}