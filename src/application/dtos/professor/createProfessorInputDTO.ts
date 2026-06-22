export class CreateProfessorInputDTO {
    constructor(
        readonly name: string,
        readonly email: string,
        readonly registration: string,
        readonly telephone: string,
        readonly coordinationId: number,
        readonly password: string
    ) {}
}
