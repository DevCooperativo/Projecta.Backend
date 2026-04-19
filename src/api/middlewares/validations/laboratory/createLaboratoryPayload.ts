import { IPayloadValidation } from "../abstractions/iPayloadValidation";

export const CreateLaboratoryPayload: IPayloadValidation = {
    name: { type: "string", required: true },
    storageSpace: { type: "number", required: true },
    maxOccupants: { type: "number", required: true },
    description: { type: "string", required: true },
    professorId: { type: "number", required: true }
}
