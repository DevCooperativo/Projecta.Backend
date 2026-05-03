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
import EquipmentDTO from "../dtos/equipmentDTO";
import IResearcherServices from "../interfaces/iResearcherServices";
import IProjectServices from "../interfaces/iProjectServices";
@injectable()
export class BorrowServices implements IBorrowServices {
    constructor(
        @inject("BorrowRepository")
        private readonly borrowRepository: IBorrowRepository,
        @inject("UserContextServices")
        private readonly userContextServices: IUserContextServices,
        @inject("EquipmentServices")
        private readonly equipmentServices: IEquipmentServices,
        @inject("ResearcherServices")
        private readonly researcherServices: IResearcherServices,
        @inject("ProjectServices")
        private readonly projectServices: IProjectServices,
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
            // If student, check if researcher and if equipment is on the same project of the student
            if (userContext.currentProfileType === AccountType.student && !(await this.IsStudentOfSameProject(equipment, userContext.currentProfile.id)))
                throw new ApplicationException(ApplicationExceptionName.INVALID_OPERATION, "The equipment doesn't belongs to the user's project", 403);
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
            console.log(data.accountType)
            const userContext = await this.userContextServices.GetUserContext(data.userEmail, data.accountType)
            const borrow = await this.borrowRepository.FindById(id)
            if (!borrow)
                throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "No borrow was found with the provided id", 404)
            let equipment: EquipmentDTO | null;
            if (!borrow.userCanModify(userContext.currentProfile.id, userContext.currentProfileType === AccountType.professor ? "professor" : "student"))
                throw new ApplicationException(ApplicationExceptionName.NOT_BELONGS_TO, "User cannot modify this borrow", 403)
            if (data.equipmentId) {
                equipment = await this.equipmentServices.GetByIdAsync(data.equipmentId)

                // Check if equipment exists
                if (!equipment)
                    throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "Equipment not found", 404)

                // If student, check if researcher and if equipment is on the same project of the student
                if (userContext.currentProfileType === AccountType.student && !(await this.IsStudentOfSameProject(equipment, userContext.currentProfile.id)))
                    throw new ApplicationException(ApplicationExceptionName.INVALID_OPERATION, "The equipment doesn't belongs to the user's project", 403);

                const borrows = await this.borrowRepository.Find()

                //Check if equipment is available for borrowing 
                if (!this.CanBeBorrowed(borrows, equipment?.id))
                    throw new ApplicationException(ApplicationExceptionName.INVALID_OPERATION, "The equipment is already borrowed.", 409)

                borrow.changeEquipment(equipment.id)
            }
            if (data.isStillBorrowed) {
                borrow.changeBorrowState(data.isStillBorrowed);
            }
            if (data.borrowDate) {
                borrow.changeBorrowDate(data.borrowDate);
            }
            if (data.studentId && data.professorId) {
                throw new ApplicationException(ApplicationExceptionName.INVALID_OPERATION, "You cannot update and set both student and professor id on the same borrow", 400);
            }
            if (data.studentId) {
                borrow.changeBorrower(data.studentId, "student");
            } else if (data.professorId) {
                borrow.changeBorrower(data.professorId, "professor")
            }



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
            if (!borrow.userCanModify(userContext.currentProfile.id, userContext.currentProfileType === AccountType.professor ? "professor" : "student"))
                throw new ApplicationException(ApplicationExceptionName.NOT_BELONGS_TO, "User cannot interact with the borrow", 403)
            borrow.returnBorrowedItem()
            await this.borrowRepository.Update(borrow.id, borrow, trx)
            return true
        })
    }


    private CanBeBorrowed(borrows: BorrowDTO[], equipmentId?: number) {
        if (!equipmentId)
            return null
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

    private async IsStudentOfSameProject(equipemnt: EquipmentDTO, userId: number) {
        const researcherList = await this.researcherServices.GetAllAsync();
        const equivalentResearchers = researcherList.filter(x => x.studentId === userId)
        if (!equivalentResearchers.map(x => x.projectId).includes(equipemnt.projectId))
            return false;
        return true;
    }
}