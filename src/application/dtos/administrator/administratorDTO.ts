export class AdministratorDTO {

    constructor(
        readonly id: number,
        readonly name: string,
        readonly email: string,
        readonly isVisible: boolean,
        readonly createdAt: Date,
        readonly updatedAt: Date) { }
}