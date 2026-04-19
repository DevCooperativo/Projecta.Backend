import { BorrowDTO } from "@/application/dtos/borrowDTO";
import { CreateBorrowInputDTO } from "@/application/dtos/borrow/createBorrowInputDTO";
import { CreateBorrowReturnDTO } from "@/application/dtos/borrow/createBorrowReturnDTO";
import { UpdateBorrowInputDTO } from "@/application/dtos/borrow/updateBorrowInputDTO";
import { UpdateBorrowReturnDTO } from "@/application/dtos/borrow/updateBorrowReturnDTO";

export interface IBorrowServices {
    GetAllAsync: () => Promise<BorrowDTO[]>
    GetByIdAsync: (id: number) => Promise<BorrowDTO | null>
    CreateAsync(data: CreateBorrowInputDTO): Promise<CreateBorrowReturnDTO>
    UpdateAsync(id: number, data: UpdateBorrowInputDTO): Promise<UpdateBorrowReturnDTO>
    DeleteAsync(id: number): Promise<boolean>
}