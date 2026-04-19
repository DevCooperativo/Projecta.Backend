import { IPayloadValidation } from "../abstractions/iPayloadValidation";

export const CreateEquipmentCategoryPayload: IPayloadValidation = {
    powerSource: { type: "boolean", required: true },
    fragile: { type: "boolean", required: true },
    description: { type: "string", required: true }
}
