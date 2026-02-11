import ProfessorDTO from "application/dtos/professorDTO";

interface IProfessorServices {
    GetAllAsync: () => Promise<ProfessorDTO[]>
    GetByIdAsync: (id: number) => Promise<ProfessorDTO | null>
    CreateAsync: (data: ProfessorDTO) => Promise<ProfessorDTO>
    UpdateAsync: (id: number, data: ProfessorDTO) => Promise<ProfessorDTO>
    DeleteAsync: (id: number) => Promise<boolean>
}

export default IProfessorServices