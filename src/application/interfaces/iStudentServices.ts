import StudentDTO from "application/dtos/studentDTO";

interface IStudentServices {
    GetAllAsync: () => Promise<StudentDTO[]>
    GetByIdAsync: (id: number) => Promise<StudentDTO | null>
    CreateAsync: (data: StudentDTO) => Promise<StudentDTO>
    UpdateAsync: (id: number, data: StudentDTO) => Promise<StudentDTO>
    DeleteAsync: (id: number) => Promise<boolean>
}

export default IStudentServices