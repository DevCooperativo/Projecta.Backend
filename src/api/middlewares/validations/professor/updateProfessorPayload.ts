import { IPayloadValidation } from "../abstractions/iPayloadValidation";

export const UpdateProfessorPayload: IPayloadValidation = {
    name: { type: "string", required: false },
    telephone: { type: "string", required: false },
    registration: { type: "string", required: false }
}
