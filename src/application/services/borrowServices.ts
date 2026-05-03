import { ApplicationExceptionName } from "@/application/constants/applicationExceptionName";
import { UpdateBorrowInputDTO } from "@/application/dtos/borrow/updateBorrowInputDTO";
import ApplicationException from "@/application/exceptions/applicationException";
import { IBorrowServices } from "@/application/interfaces/iBorrowServices";
import Borrow from "@/domain/models/borrow";
import IBorrowRepository from "@/domain/repositories/iBorrowRepository";
import { inject, injectable } from "tsyringe";
import { IUnitOfWork } from "../unitOfWork/iUnitOfWork";
import { CreateBorrowInputDTO } from "../dtos/borrow/createBorrowInputDTO";
import { BorrowDTO } from "../dtos/borrow/borrowDTO";
import { AccountType } from "@/infrastructure/authentication/constants/accountType";
import IEquipmentServices from "../interfaces/iEquipmentServices";
import { ReturnBorrowInputDTO } from "../dtos/borrow/returnBorrowInputDTO";
import { IUserContextServices } from "../interfaces/iUserContextServices";

@injectable()
export class BorrowServices implements IBorrowServices {
    constructor(
        @inject("BorrowRepository")
        private readonly borrowRepository: IBorrowRepository,
        @inject("UserContextServices")
        private readonly userContextServices: IUserContextServices,
        @inject("EquipmentServices")
        private readonly equipmentServices: IEquipmentServices,
        @inject("SequelizeUnitOfWork")
        private readonly unitOfWork: IUnitOfWork
    ) { }

    async GetAllAsync() {
        const result = await this.borrowRepository.Find();
        return result.map(x => new BorrowDTO(x.id, x.equipmentId, x.isStillBorrowed, x.borrowDate, x.isVisible, x.createdAt, x.updatedAt, x.studentId, x.professorId, x.returnDate))
    }
    async GetByIdAsync(id: number) {
        const result = await this.borrowRepository.FindById(id)
        if (!result)
            throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "No borrow was found with the provided id", 404)
        return new BorrowDTO(result.id, result.equipmentId, result.isStillBorrowed, result.borrowDate, result.isVisible, result.createdAt, result.updatedAt, result.studentId, result.professorId, result.returnDate)
    }
    async CreateAsync(data: CreateBorrowInputDTO) {
        return await this.unitOfWork.execute(async (trx) => {
            const userContext = await this.userContextServices.GetUserContext(data.userEmail, data.accountType)
            const equipment = await this.equipmentServices.GetByIdAsync(data.equipmentId);
            if (!equipment)
                throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "The equipment doesn't exists", 404);
            const borrows = await this.GetAllAsync()
            if (!this.CanBeBorrowed(borrows, data.equipmentId))
                throw new ApplicationException(ApplicationExceptionName.INVALID_OPERATION, "Equipment is already borrowed", 400)

            if (this.IsExceedingBorrows(borrows, userContext.currentProfile!.id, userContext.currentProfileType))
                throw new ApplicationException(ApplicationExceptionName.INVALID_OPERATION, "You will exceed your borrow limits. Return an equipment before proceeding", 400)
            const professorId = userContext.currentProfileType === AccountType.professor ? userContext.currentProfile!.id : undefined
            const studentId = userContext.currentProfileType === AccountType.student ? userContext.currentProfile!.id : undefined
            const borrow = Borrow.create(data.equipmentId, data.borrowDate, studentId, professorId, undefined, data.returnDate)
            const result = await this.borrowRepository.Create(borrow, trx)
            if (!result)
                return null

            return new BorrowDTO(result.id, result.equipmentId, result.isStillBorrowed, result.borrowDate, result.isVisible, result.createdAt, result.updatedAt, result.studentId, result.professorId)
        })
    }
    async UpdateAsync(id: number, data: UpdateBorrowInputDTO) {
        return await this.unitOfWork.execute(async (trx) => {
            const userContext = await this.userContextServices.GetUserContext(data.userEmail, data.accountType)
            const borrow = await this.borrowRepository.FindById(id)
            if (!borrow)
                throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "No borrow was found with the provided id", 404)
            const equipment = await this.equipmentServices.GetByIdAsync(data.equipmentId)
            if (!equipment)
                throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "Equipment not found", 404)

            const borrows = await this.borrowRepository.Find()
            if (!this.CanBeBorrowed(borrows, equipment.id))
                throw new ApplicationException(ApplicationExceptionName.INVALID_OPERATION, "The equipment is already borrowed.", 409)

            const professorId = userContext.currentProfileType === AccountType.professor ? userContext.currentProfile!.id : undefined
            const studentId = userContext.currentProfileType === AccountType.student ? userContext.currentProfile!.id : undefined
            if (!borrow.userCanModify(professorId, studentId))
                throw new ApplicationException(ApplicationExceptionName.NOT_BELONGS_TO, "User cannot modify this borrow", 403)

            borrow.changeEquipment(equipment.id)
            const result = await this.borrowRepository.Update(id, borrow, trx)
            if (!result)
                return null
            return new BorrowDTO(result.id, result.equipmentId, result.isStillBorrowed, result.borrowDate, result.isVisible, result.createdAt, result.updatedAt, result.studentId, result.professorId)
        })
    }
    async DeleteAsync(id: number) {
        return await this.unitOfWork.execute(async (trx) => {
            return (await this.borrowRepository.Delete(id, trx))
        })
    }

    async ReturnBorrowAsync(data: ReturnBorrowInputDTO) {
        return await this.unitOfWork.execute(async (trx) => {
            const borrow = await this.borrowRepository.FindById(data.borrowId);
            const userContext = await this.userContextServices.GetUserContext(data.userEmail, data.accountType)
            if (!borrow)
                throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "Borrow not found", 404)
            const professorId = userContext.currentProfileType === AccountType.professor ? userContext.currentProfile!.id : undefined
            const studentId = userContext.currentProfileType === AccountType.student ? userContext.currentProfile!.id : undefined
            if (!borrow.userCanModify(professorId, studentId))
                throw new ApplicationException(ApplicationExceptionName.NOT_BELONGS_TO, "User cannot interact with the borrow", 403)
            borrow.returnBorrowedItem()
            await this.borrowRepository.Update(borrow.id, borrow, trx)
            return true
        })
    }


    private CanBeBorrowed(borrows: BorrowDTO[], equipmentId: number) {
        const activeBorrow = borrows.find(x => x.equipmentId === equipmentId && x.isStillBorrowed)
        if (activeBorrow)
            return false
        return true
    }
    private IsExceedingBorrows(borrows: BorrowDTO[], borrowerId: number, userType: AccountType) {
        const borrowsPerUser = borrows.filter(x => {
            const condition: boolean[] = []
            if (userType === AccountType.professor) {
                condition.push(x.professorId === borrowerId)
            }
            else {
                condition.push(x.studentId === borrowerId)
            }
            return condition.every(Boolean)
        })
        if ((userType === AccountType.student && borrowsPerUser.length === 5) || (userType === AccountType.professor && borrowsPerUser.length === 10)) {
            return true
        }
        return false
    }
}