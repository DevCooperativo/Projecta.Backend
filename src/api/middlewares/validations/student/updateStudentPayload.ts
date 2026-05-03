import { IPayloadValidation } from "../abstractions/iPayloadValidation";

export const UpdateStudentPayload: IPayloadValidation = {
    name: { type: "string", required: true },
    birthdate: { type: "string", required: true },
}
