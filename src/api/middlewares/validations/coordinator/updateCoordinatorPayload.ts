import { IPayloadValidation } from "../abstractions/iPayloadValidation";

export const UpdateCoordinatorPayload: IPayloadValidation = {
    id: { type: "string", required: true, source: "params" },
    area: { type: "string", required: true },
    startDate: { type: "string", required: true },
    professorId: { type: "number", required: true },
    projectId: { type: "number", required: true }
}
