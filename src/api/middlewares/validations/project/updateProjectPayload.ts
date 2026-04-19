import { IPayloadValidation } from "../abstractions/iPayloadValidation";

export const UpdateProjectPayload: IPayloadValidation = {
    id: { type: "string", required: true, source: "params" },
    name: { type: "string", required: true },
    description: { type: "string", required: true },
    startDate: { type: "string", required: true },
    status: { type: "string", required: true },
    laboratoryId: { type: "number", required: true },
    projectCategoryId: { type: "number", required: true }
}
