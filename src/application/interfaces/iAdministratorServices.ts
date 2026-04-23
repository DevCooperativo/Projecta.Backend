import { AdministratorDTO } from "@/application/dtos/administratorDTO";
import { CreateAdministratorInputDTO } from "@/application/dtos/administrator/createAdministratorInputDTO";
import { CreateAdministratorReturnDTO } from "@/application/dtos/administrator/createAdministratorReturnDTO";
import { UpdateAdministratorInputDTO } from "@/application/dtos/administrator/updateAdministratorInputDTO";
import { UpdateAdministratorReturnDTO } from "@/application/dtos/administrator/updateAdministratorReturnDTO";
import { DeleteAdministratorInputDTO } from "../dtos/administrator/deleteAdministratorInputDTO";
import { DeleteAdministratorReturnDTO } from "../dtos/administrator/deleteAdministratorReturnDTO";

interface IAdministratorServices {
    FindByEmailAsync: (email: string) => Promise<AdministratorDTO | null>
    GetAllAsync: () => Promise<AdministratorDTO[]>
    GetByIdAsync: (id: number) => Promise<AdministratorDTO | null>
    CreateAsync: (data: CreateAdministratorInputDTO) => Promise<CreateAdministratorReturnDTO>
    UpdateAsync: (data: UpdateAdministratorInputDTO) => Promise<UpdateAdministratorReturnDTO>
    DeleteAsync: (data: DeleteAdministratorInputDTO) => Promise<DeleteAdministratorReturnDTO>
}

export default IAdministratorServices