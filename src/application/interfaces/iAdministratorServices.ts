import { AdministratorDTO } from "application/dtos/administratorDTO";

interface IAdministratorServices {
    FindByEmailAsync: (email: string) => Promise<AdministratorDTO | null>
    GetAllAsync: () => Promise<AdministratorDTO[]>
    GetByIdAsync: (id: number) => Promise<AdministratorDTO | null>
    CreateAsync: (data: AdministratorDTO) => Promise<AdministratorDTO>
    UpdateAsync: (id: number, data: AdministratorDTO) => Promise<AdministratorDTO>
    DeleteAsync: (id: number) => Promise<boolean>
}

export default IAdministratorServices