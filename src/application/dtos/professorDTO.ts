class ProfessorDTO {

    constructor(
        readonly id: number,
        readonly name: string,
        readonly email: string,
        readonly registration: string,
        readonly telephone: string,
        readonly coordinationId: number,
        readonly createdAt: Date,
        readonly updatedAt: Date,
        readonly isVisible: boolean,
    ) { }
}
export default ProfessorDTO