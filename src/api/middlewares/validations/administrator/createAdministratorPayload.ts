import { IPayloadValidation } from "../abstractions/iPayloadValidation";

export const CreateAdministratorPayload: IPayloadValidation = {
    email: { type: "string", required: true, source: "body" },
    password: { type: "string", required: true, source: "body" },


}
