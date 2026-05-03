import { IPayloadValidation } from "../abstractions/iPayloadValidation";

export const CreateProjectPayload: IPayloadValidation = {
    name: { type: "string", required: true },
    description: { type: "string", required: true },
    startDate: { type: "string", required: true },
    endDate: { type: "string", required: false },
    status: { type: "string", required: true },
    laboratoryId: { type: "number", required: true },
    projectCategoryId: { type: "number", required: true },
    coordinators: { type: "object", required: true },
    researchers: { type: "object", required: false },
}
