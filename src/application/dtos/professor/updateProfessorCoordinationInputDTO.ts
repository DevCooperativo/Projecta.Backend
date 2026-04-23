export class UpdateProfessorCoordinationInputDTO {
    constructor(
        readonly userId: number,
        readonly professorId: number,
        readonly coordinationId: number,
    ) {}
}
