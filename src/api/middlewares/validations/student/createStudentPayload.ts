import { IPayloadValidation } from "../abstractions/iPayloadValidation";

export const CreateStudentPayload: IPayloadValidation = {
    name: { type: "string", required: true },
    email: { type: "string", required: true },
    registration: { type: "string", required: true },
    password: { type: "string", required: true },
    birthdate: { type: "string", required: true },
    term: { type: "string", required: true },
    shift: { type: "string", required: true }
}
