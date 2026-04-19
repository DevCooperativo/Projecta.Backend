import { IPayloadValidation } from "../abstractions/iPayloadValidation";

export const UpdateResearcherPayload: IPayloadValidation = {
    id: { type: "string", required: true, source: "params" },
    name: { type: "string", required: true },
    functionName: { type: "string", required: true },
    weeklyHours: { type: "number", required: true },
    startDate: { type: "string", required: true },
    projectId: { type: "number", required: true }
}
