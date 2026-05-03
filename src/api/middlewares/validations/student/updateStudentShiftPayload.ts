import { IPayloadValidation } from "../abstractions/iPayloadValidation";

export const UpdateStudentShiftPayload: IPayloadValidation = {
    shift: { type: "string", required: true },
}
