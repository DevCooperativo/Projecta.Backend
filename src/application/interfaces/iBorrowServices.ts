import { CreateBorrowInputDTO } from "@/application/dtos/borrow/createBorrowInputDTO";
import { UpdateBorrowInputDTO } from "@/application/dtos/borrow/updateBorrowInputDTO";
import { BorrowDTO } from "../dtos/borrow/borrowDTO";
import { ReturnBorrowInputDTO } from "../dtos/borrow/returnBorrowInputDTO";

export interface IBorrowServices {
    GetAllAsync: () => Promise<BorrowDTO[]>
    GetByIdAsync: (id: number) => Promise<BorrowDTO | null>
    CreateAsync(data: CreateBorrowInputDTO): Promise<BorrowDTO | null>
    UpdateAsync(id: number, data: UpdateBorrowInputDTO): Promise<BorrowDTO | null>
    ReturnBorrowAsync(data: ReturnBorrowInputDTO): Promise<boolean>
    DeleteAsync(id: number): Promise<boolean>
}