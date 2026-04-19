import { IPayloadValidation } from "../abstractions/iPayloadValidation";

export const UpdateEquipmentCategoryPayload: IPayloadValidation = {
    id: { type: "string", required: true, source: "params" },
    powerSource: { type: "boolean", required: true },
    fragile: { type: "boolean", required: true },
    description: { type: "string", required: true }
}
