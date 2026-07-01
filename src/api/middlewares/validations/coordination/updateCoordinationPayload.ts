import { IPayloadValidation } from "../abstractions/iPayloadValidation";

export const UpdateCoordinationPayload: IPayloadValidation = {
    id: { type: "string", required: true, source: "params" },
    area: { type: "string", required: true },
    block: { type: "string", required: true },
    description: { type: "string", required: true }
}
