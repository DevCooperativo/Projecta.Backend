import { AdministratorDTO } from "@/application/dtos/administratorDTO";
import { CreateAdministratorInputDTO } from "@/application/dtos/administrator/createAdministratorInputDTO";
import { CreateAdministratorReturnDTO } from "@/application/dtos/administrator/createAdministratorReturnDTO";
import { UpdateAdministratorInputDTO } from "@/application/dtos/administrator/updateAdministratorInputDTO";
import { UpdateAdministratorReturnDTO } from "@/application/dtos/administrator/updateAdministratorReturnDTO";

interface IAdministratorServices {
    FindByEmailAsync: (email: string) => Promise<AdministratorDTO | null>
    GetAllAsync: () => Promise<AdministratorDTO[]>
    GetByIdAsync: (id: number) => Promise<AdministratorDTO | null>
    CreateAsync: (data: CreateAdministratorInputDTO) => Promise<CreateAdministratorReturnDTO>
    UpdateAsync: (id: number, data: UpdateAdministratorInputDTO) => Promise<UpdateAdministratorReturnDTO>
    DeleteAsync: (id: number) => Promise<boolean>
}

export default IAdministratorServices