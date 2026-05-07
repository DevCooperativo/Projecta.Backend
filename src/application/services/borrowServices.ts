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
import { UserContextDTO } from "../dtos/userContext/userContextDTO";
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
            await this.CheckIfStudentIsOfSameProject(equipment, userContext)
            const borrows = await this.GetAllAsync()
            this.CheckIfIsAlreadyBorrowed(borrows, data.equipmentId)
            this.CheckIfIsExceedingBorrows(borrows, userContext.currentProfile!.id, userContext.currentProfileType)
            const professorId = userContext.currentProfileType === AccountType.professor ? userContext.currentProfile!.id : undefined
            const studentId = userContext.currentProfileType === AccountType.student ? userContext.currentProfile!.id : undefined
            const borrow = Borrow.create(data.equipmentId, data.borrowDate, studentId, professorId, data.returnDate)
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
            this.CheckIfUserCanModify(borrow, userContext);
            this.handleEquipmentUpdate(borrow, userContext, data.equipmentId)
            this.HandleBorrowStateUpdate(borrow, data.isStillBorrowed);
            this.HandleBorrowDateUpdate(borrow, data.borrowDate);
            this.HandleBorrowerUpdate(borrow, data.studentId, data.professorId);
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



    private CheckIfUserCanModify(borrow: Borrow, userContext: UserContextDTO) {
        if (!borrow.userCanModify(userContext.currentProfile.id, userContext.currentProfileType === AccountType.professor ? "professor" : "student"))
            throw new ApplicationException(ApplicationExceptionName.NOT_BELONGS_TO, "User cannot modify this borrow", 403)
    }

    private CheckIfIsAlreadyBorrowed(borrows: BorrowDTO[], equipmentId?: number) {
        if (!equipmentId) return;
        const activeBorrow = borrows.find(x => x.equipmentId === equipmentId && x.isStillBorrowed)
        if (activeBorrow)
            throw new ApplicationException(ApplicationExceptionName.INVALID_OPERATION, "Equipment is already borrowed", 409)
    }
    private CheckIfIsExceedingBorrows(borrows: BorrowDTO[], borrowerId: number, userType: AccountType) {
        //RN2 e RN3. Alunos só podem ter 5 empréstimos simultâneos, enquanto professores podem ter 10
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
            throw new ApplicationException(ApplicationExceptionName.INVALID_OPERATION, "You will exceed your borrow limits. Return an equipment before proceeding", 409)
        }
        return;
    }

    private async CheckIfStudentIsOfSameProject(equipemnt: EquipmentDTO, userContext: UserContextDTO) {
        if (userContext.currentProfileType !== "student")
            return true
        const researcherList = await this.researcherServices.GetAllAsync();
        const equivalentResearchers = researcherList.filter(x => x.studentId === userContext.currentProfile.id)
        if (!equivalentResearchers.map(x => x.projectId).includes(equipemnt.projectId))
            throw new ApplicationException(ApplicationExceptionName.INVALID_OPERATION, "The equipment doesn't belongs to the user's project", 403);
        return true;
    }


    private async handleEquipmentUpdate(borrow: Borrow, userContext: UserContextDTO, equipmentId?: number) {
        if (!equipmentId) return


        const equipment = await this.equipmentServices.GetByIdAsync(equipmentId)
        if (!equipment)
            throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "Equipment not found", 404)
        await this.CheckIfStudentIsOfSameProject(equipment, userContext)
        const borrows = await this.borrowRepository.Find()
        this.CheckIfIsAlreadyBorrowed(borrows, equipment?.id)
        borrow.changeEquipment(equipment.id)
    }
    private HandleBorrowStateUpdate(borrow: Borrow, isStillBorrowed?: boolean) {
        if (!isStillBorrowed) return null;
        borrow.changeBorrowState(isStillBorrowed);
    }
    private HandleBorrowDateUpdate(borrow: Borrow, borrowDate?: Date) {
        if (!borrowDate) return null;
        borrow.changeBorrowDate(borrowDate);
    }
    private HandleBorrowerUpdate(borrow: Borrow, studentId?: number, professorId?: number) {
        if (!studentId && !professorId) return null;
        if (studentId && professorId) {
            throw new ApplicationException(ApplicationExceptionName.INVALID_OPERATION, "You cannot update and set both student and professor id on the same borrow", 400);
        }
        if (studentId) {
            borrow.changeBorrower(studentId, "student");
        } else if (professorId) {
            borrow.changeBorrower(professorId, "professor")
        }
    }
}