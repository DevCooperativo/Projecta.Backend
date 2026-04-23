export class UpdateProfessorCoordinationReturnDTO {
    constructor(
        readonly id: number,
        readonly name: string,
        readonly email: string,
        readonly registration: string,
        readonly telephone: string,
        readonly coordinationId: number
    ) {}
}
