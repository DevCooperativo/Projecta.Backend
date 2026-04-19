import { IPayloadValidation } from "../abstractions/iPayloadValidation";

export const CreateProjectCategoryPayload: IPayloadValidation = {
    name: { type: "string", required: true },
    commerciallyRelevant: { type: "boolean", required: true },
    area: { type: "string", required: true },
    description: { type: "string", required: true }
}
