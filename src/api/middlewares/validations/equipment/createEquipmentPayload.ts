import { IPayloadValidation } from "../abstractions/iPayloadValidation";

export const CreateEquipmentPayload: IPayloadValidation = {
    name: { type: "string", required: true },
    laboratoryId: { type: "number", required: true },
    projectId: { type: "number", required: true },
    equipmentCategoryId: { type: "number", required: true }
}
