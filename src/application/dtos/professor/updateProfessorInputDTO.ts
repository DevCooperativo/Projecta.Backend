export class UpdateProfessorInputDTO {
    constructor(
        readonly name: string,
        readonly email: string,
        readonly registration: string,
        readonly telephone?: string,
        readonly coordinationId?: number
    ) {}
}
