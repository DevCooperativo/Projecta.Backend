import { IPayloadValidation } from "../abstractions/iPayloadValidation";

export const UpdateProjectCategoryPayload: IPayloadValidation = {
    id: { type: "string", required: true, source: "params" },
    name: { type: "string", required: true },
    commerciallyRelevant: { type: "boolean", required: true },
    area: { type: "string", required: true },
    description: { type: "string", required: true }
}
