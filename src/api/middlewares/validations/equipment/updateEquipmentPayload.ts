import { IPayloadValidation } from "../abstractions/iPayloadValidation";

export const UpdateEquipmentPayload: IPayloadValidation = {
    id: { type: "string", required: true, source: "params" },
    name: { type: "string", required: true },
    laboratoryId: { type: "number", required: true },
    projectId: { type: "number", required: true },
    equipmentCategoryId: { type: "number", required: true }
}
