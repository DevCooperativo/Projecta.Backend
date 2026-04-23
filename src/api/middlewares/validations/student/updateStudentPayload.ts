import { IPayloadValidation } from "../abstractions/iPayloadValidation";

export const UpdateStudentPayload: IPayloadValidation = {
    id: { type: "string", required: true, source: "params" },
    name: { type: "string", required: true },
    registration: { type: "string", required: true },
    birthdate: { type: "string", required: true },
    term: { type: "number", required: true },
    shift: { type: "string", required: true }
}
