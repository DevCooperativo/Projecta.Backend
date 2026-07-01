import { IPayloadValidation } from "../abstractions/iPayloadValidation";

export const CreateBorrowPayload: IPayloadValidation = {
    equipmentId: { type: "number", required: true },
    studentId: { type: "number", required: false, crossValidation: { field: "professorId", condition: "mustNotBePresentIf" } },
    professorId: { type: "number", required: false, crossValidation: { field: "studentId", condition: "mustNotBePresentIf" } },
    borrowDate:{ type: "string", required: true },
}