import { inject, injectable } from "tsyringe"
import { IBorrowMetricsServices } from "../interfaces/iBorrowMetricsServices"
import { IUserContextServices } from "../interfaces/iUserContextServices"
import IBorrowRepository from "@/domain/repositories/iBorrowRepository"
import IStudentServices from "../interfaces/iStudentServices"
import IProfessorServices from "../interfaces/iProfessorServices"
import { BorrowFilterSpec } from "@/domain/repositories/borrowFilterSpec"
import { AccountType } from "@/infrastructure/authentication/constants/accountType"
import ApplicationException from "../exceptions/applicationException"
import { ApplicationExceptionName } from "../constants/applicationExceptionName"
import { BorrowMetricsDTO } from "../dtos/borrow/borrowMetricsDTO"

@injectable()
export class BorrowMetricsServices implements IBorrowMetricsServices {
    constructor(
        @inject("BorrowRepository")
        private readonly borrowRepository: IBorrowRepository,
        @inject("UserContextServices")
        private readonly userContextServices: IUserContextServices,
        @inject("StudentServices")
        private readonly studentServices: IStudentServices,
        @inject("ProfessorServices")
        private readonly professorServices: IProfessorServices
    ) { }

    async GetOwnMetricsAsync(): Promise<BorrowMetricsDTO> {
        const ctx = this.userContextServices.GetCurrentContext()
        const isProfessor = ctx.currentAccountType === AccountType.professor

        const profile = isProfessor
            ? await this.professorServices.GetByEmailAsync(ctx.email)
            : await this.studentServices.GetByEmailAsync(ctx.email)

        if (!profile)
            throw new ApplicationException(ApplicationExceptionName.NOT_FOUND, "User profile not found", 404)

        const borrowerType = isProfessor ? "professor" : "student"
        const spec = new BorrowFilterSpec(undefined, profile.id, borrowerType)
        const borrows = await this.borrowRepository.Find(spec)

        const total = borrows.length
        const active = borrows.filter(b => b.isStillBorrowed).length
        const finished = total - active

        return new BorrowMetricsDTO(total, active, finished)
    }
}
