import { IPayloadValidation } from "../abstractions/iPayloadValidation";

export const UpdateBorrowPayload: IPayloadValidation = {
    id: { type: "string", required: true, source: "params" },
    equipmentId: { type: "number", required: true },
    borrowDate: { type: "string", required: true },
    isStillBorrowed: { type: "boolean", required: true },
    studentId: { type: "number", required: false },
    professorId: { type: "number", required: false },
    returnDate: { type: "string", required: false }
}
