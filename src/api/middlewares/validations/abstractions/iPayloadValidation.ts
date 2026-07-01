export interface IPayloadValidation {
    [key: string]: {
        type: "string" | "number" | "boolean" | "object",
        required: boolean,
        source?: "body" | "params",
        crossValidation?: { field: string, condition: "equals" | "notEquals" | "greaterThan" | "lessThan" | "mustNotBePresentIf" | "mustBePresentIf" }
    }
}