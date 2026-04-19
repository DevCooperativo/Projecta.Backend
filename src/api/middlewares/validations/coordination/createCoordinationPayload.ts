import { IPayloadValidation } from "../abstractions/iPayloadValidation";

export const CreateCoordinationPayload: IPayloadValidation = {
    area: { type: "string", required: true },
    block: { type: "string", required: true },
    description: { type: "string", required: true }
}
