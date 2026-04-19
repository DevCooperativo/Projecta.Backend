import { IPayloadValidation } from "../abstractions/iPayloadValidation";

export const CreateCoordinatorPayload: IPayloadValidation = {
    area: { type: "string", required: true },
    startDate: { type: "string", required: true },
    professorId: { type: "number", required: true },
    projectId: { type: "number", required: true }
}
