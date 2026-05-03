import { IPayloadValidation } from "../abstractions/iPayloadValidation";

export const ChangeProfessorCoordinationPayload: IPayloadValidation = {
    coordinationId: { required: true, source: "body", type: "number" }
}