import { IPayloadValidation } from "../abstractions/iPayloadValidation";

export const UpdateAdministratorPayload: IPayloadValidation = {
    id: { type: "string", required: true, source: "params" },
    email: { type: "string", required: true }
}
