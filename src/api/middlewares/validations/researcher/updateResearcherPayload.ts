import { IPayloadValidation } from "../abstractions/iPayloadValidation";

export const UpdateResearcherPayload: IPayloadValidation = {
    id: { type: "string", required: true, source: "params" },
    name: { type: "string", required: true },
    functionName: { type: "string", required: true },
    weeklyHours: { type: "number", required: true },
    startDate: { type: "string", required: true },
    endDate: { type: "string", required: false },
    projectId: { type: "number", required: true },
    professorId: { type: "number", required: false },
    studentId: { type: "number", required: false },
}
