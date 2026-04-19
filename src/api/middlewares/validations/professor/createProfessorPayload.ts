import { IPayloadValidation } from "../abstractions/iPayloadValidation";

export const CreateProfessorPayload: IPayloadValidation = {
    name: { type: "string", required: true },
    email: { type: "string", required: true },
    registration: { type: "string", required: true },
    telephone: { type: "string", required: true },
    coordinationId: { type: "number", required: true }
}
