import { IPayloadValidation } from "../abstractions/iPayloadValidation";

export const DeleteByIdPayload: IPayloadValidation = {
    id: { type: "string", required: true, source: "params" }
}
