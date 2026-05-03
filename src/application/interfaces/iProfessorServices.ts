import ProfessorDTO from "@/application/dtos/professorDTO";
import { CreateProfessorInputDTO } from "@/application/dtos/professor/createProfessorInputDTO";
import { CreateProfessorReturnDTO } from "@/application/dtos/professor/createProfessorReturnDTO";
import { UpdateProfessorInputDTO } from "@/application/dtos/professor/updateProfessorInputDTO";
import { UpdateProfessorReturnDTO } from "@/application/dtos/professor/updateProfessorReturnDTO";
import { ChangeProfessorCoordinationInputDTO } from "../dtos/professor/changeProfessorCoordinationInputDTO";
import { ChangeProfessorCoordinationReturnDTO } from "../dtos/professor/updateProfessorCoordinationReturnDTO";

interface IProfessorServices {
    GetAllAsync: () => Promise<ProfessorDTO[]>
    GetByIdAsync: (id: number) => Promise<ProfessorDTO | null>
    GetByEmailAsync: (email: string) => Promise<ProfessorDTO | null>
    CreateAsync: (data: CreateProfessorInputDTO) => Promise<CreateProfessorReturnDTO>
    UpdateAsync: (data: UpdateProfessorInputDTO) => Promise<UpdateProfessorReturnDTO>
    ChangeProfessorCoordinationAsync: (data: ChangeProfessorCoordinationInputDTO) => Promise<ChangeProfessorCoordinationReturnDTO>
    DeleteAsync: (id: number) => Promise<boolean>
}

export default IProfessorServices