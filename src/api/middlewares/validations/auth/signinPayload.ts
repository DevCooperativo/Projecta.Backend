import { IPayloadValidation } from "../abstractions/iPayloadValidation";

export const SigninPayload: IPayloadValidation = {
    email: { type: "string", required: true },
    password: { type: "string", required: true }
}
