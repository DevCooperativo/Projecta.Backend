import { ApplicationExceptionName } from "@/application/constants/applicationExceptionName";
import { BorrowDTO } from "@/application/dtos/borrowDTO";
import { CreateBorrowInputDTO } from "@/application/dtos/borrow/createBorrowInputDTO";
import { CreateBorrowReturnDTO } from "@/application/dtos/borrow/createBorrowReturnDTO";
import { UpdateBorrowInputDTO } from "@/application/dtos/borrow/updateBorrowInputDTO";
import { UpdateBorrowReturnDTO } from "@/application/dtos/borrow/updateBorrowReturnDTO";
import ApplicationException from "@/application/exceptions/applicationException";
import { IBorrowServices } from "@/application/interfaces/iBorrowServices";
import Borrow from "@/domain/models/borrow";
import IBorrowRepository from "@/domain/repositories/iBorrowRepository";
import { inject, injectable } from "tsyringe";
import { IUnitOfWork } from "../unitOfWork/iUnitOfWork";

@injectable()
export class BorrowServices implements IBorrowServices {
    constructor(
        @inject("BorrowRepository")
        private readonly borrowRepository: IBorrowRepository,
        @inject("SequelizeUnitOfWork")
        private readonly unitOfWork: IUnitOfWork
    ) { }
    async GetAllAsync() {
        return (await this.borrowRepository.Find()) as BorrowDTO[]
    }
    async GetByIdAsync(id: number) {
        const result = await this.borrowRepository.FindById(id)
        if (!result)
            throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "No borrow was found with the provided id", 404)
        return result as BorrowDTO
    }
    async CreateAsync(data: CreateBorrowInputDTO) {
        return await this.unitOfWork.execute(async (trx) => {
            const borrow = Borrow.create(data.equipmentId, data.borrowDate, data.studentId, data.professorId, undefined, data.returnDate)
            return (await this.borrowRepository.Create(borrow, trx)) as CreateBorrowReturnDTO
        })
    }
    async UpdateAsync(id: number, data: UpdateBorrowInputDTO) {
        return await this.unitOfWork.execute(async (trx) => {
            if (!(await this.borrowRepository.FindById(id)))
                throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "No borrow was found with the provided id", 404)
            return (await this.borrowRepository.Update(id, data as Borrow, trx)) as UpdateBorrowReturnDTO
        })
    }
    async DeleteAsync(id: number) {
        return await this.unitOfWork.execute(async (trx) => {
            return (await this.borrowRepository.Delete(id, trx))
        })
    }
}