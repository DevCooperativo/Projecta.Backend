import { IPayloadValidation } from "../abstractions/iPayloadValidation";

export const UpdateStudentTermPayload: IPayloadValidation = {
    term: { type: "number", required: true },
}
