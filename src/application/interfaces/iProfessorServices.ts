import ProfessorDTO from "@/application/dtos/professorDTO";
import { CreateProfessorInputDTO } from "@/application/dtos/professor/createProfessorInputDTO";
import { CreateProfessorReturnDTO } from "@/application/dtos/professor/createProfessorReturnDTO";
import { UpdateProfessorInputDTO } from "@/application/dtos/professor/updateProfessorInputDTO";
import { UpdateProfessorReturnDTO } from "@/application/dtos/professor/updateProfessorReturnDTO";

interface IProfessorServices {
    GetAllAsync: () => Promise<ProfessorDTO[]>
    GetByIdAsync: (id: number) => Promise<ProfessorDTO | null>
    CreateAsync: (data: CreateProfessorInputDTO) => Promise<CreateProfessorReturnDTO>
    UpdateAsync: (id: number, data: UpdateProfessorInputDTO) => Promise<UpdateProfessorReturnDTO>
    DeleteAsync: (id: number) => Promise<boolean>
}

export default IProfessorServices