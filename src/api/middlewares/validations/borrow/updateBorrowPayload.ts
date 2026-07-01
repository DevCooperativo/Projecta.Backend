import { IPayloadValidation } from "../abstractions/iPayloadValidation";

export const UpdateBorrowPayload: IPayloadValidation = {
    id: { type: "string", required: true, source: "params" },
    equipmentId: { type: "number", required: false },
    borrowDate: { type: "string", required: false },
    isStillBorrowed: { type: "boolean", required: false },
    studentId: { type: "number", required: false },
    professorId: { type: "number", required: false },
    returnDate: { type: "string", required: false }
}
