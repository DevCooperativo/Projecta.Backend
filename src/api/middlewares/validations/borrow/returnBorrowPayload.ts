import { IPayloadValidation } from "../abstractions/iPayloadValidation";

export const ReturnBorrowPayload: IPayloadValidation = {
    borrowId: { required: true, type: "string", source: "params" },
}