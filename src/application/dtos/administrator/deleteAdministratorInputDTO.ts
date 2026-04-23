export class DeleteAdministratorInputDTO {
    constructor(
        readonly adminId: number,
        readonly userId: number,
    ) { }
}
