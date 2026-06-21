import { IPayloadValidation } from "../abstractions/iPayloadValidation";

export const CreateEquipmentCategoryPayload: IPayloadValidation = {
    powerSource: { type: "string", required: true },
    fragile: { type: "boolean", required: true },
    description: { type: "string", required: true }
}
