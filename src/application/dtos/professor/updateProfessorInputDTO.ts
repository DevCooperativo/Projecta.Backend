export class UpdateProfessorInputDTO {
    constructor(
        readonly creatorId: number,
        readonly professorId: number,
        readonly name: string,
        readonly registration: string,
        readonly telephone?: string,
    ) { }
}
