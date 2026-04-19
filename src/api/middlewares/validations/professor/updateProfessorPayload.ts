import { IPayloadValidation } from "../abstractions/iPayloadValidation";

export const UpdateProfessorPayload: IPayloadValidation = {
    id: { type: "string", required: true, source: "params" },
    name: { type: "string", required: true },
    email: { type: "string", required: true },
    registration: { type: "string", required: true }
}
