import { IPayloadValidation } from "../abstractions/iPayloadValidation";

export const UpdateProfessorPayload: IPayloadValidation = {
    id: { type: "string", source: "params", required: true },
    name: { type: "string", required: false },
    telephone: { type: "string", required: false },
    registration: { type: "string", required: false }
}
