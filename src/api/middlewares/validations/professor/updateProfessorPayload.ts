import { IPayloadValidation } from "../abstractions/iPayloadValidation";

export const UpdateProfessorPayload: IPayloadValidation = {
    id: { type: "string", required: true, source: "params" },
    name: { type: "string", required: false },
    telephone: { type: "string", required: false },
    registration: { type: "string", required: false }
}
