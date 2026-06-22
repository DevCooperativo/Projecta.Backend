import { IPayloadValidation } from "../abstractions/iPayloadValidation";

export const SigninPayload: IPayloadValidation = {
    email: { type: "string", source: "body", required: true },
    password: { type: "string", source: "body", required: true },
}
