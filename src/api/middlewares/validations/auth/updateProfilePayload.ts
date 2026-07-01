import { IPayloadValidation } from "../abstractions/iPayloadValidation";

export const UpdateProfilePayload: IPayloadValidation = {
    name: { type: "string", required: false },
    birthdate: { type: "string", required: false },
    registration: { type: "string", required: false },
    telephone: { type: "string", required: false },
}
