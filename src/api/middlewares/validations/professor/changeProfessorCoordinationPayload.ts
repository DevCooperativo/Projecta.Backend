import { IPayloadValidation } from "../abstractions/iPayloadValidation";

export const ChangeProfessorCoordinationPayload: IPayloadValidation = {
    id: { required: true, source: "params", type: "number" },
    coordinationId: { required: true, source: "body", type: "number" }
}