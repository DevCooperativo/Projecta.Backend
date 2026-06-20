import { IPayloadValidation } from "../abstractions/iPayloadValidation";

export const CreateCoordinatorPayload: IPayloadValidation = {
    area: { type: "string", required: true },
    startDate: { type: "string", required: true },
    endDate: { type: "string", required: false },
    professorId: { type: "number", required: true },
    projectId: { type: "number", required: true }
}
