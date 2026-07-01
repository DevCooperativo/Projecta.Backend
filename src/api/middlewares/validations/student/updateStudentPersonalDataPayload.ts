import { IPayloadValidation } from "../abstractions/iPayloadValidation";

export const UpdateStudentPersonalDataPayload: IPayloadValidation = {
    name: { type: "string", required: false },
    birthdate: { type: "string", required: false },
}
