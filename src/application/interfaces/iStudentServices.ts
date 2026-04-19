import { CreateStudentInputDTO } from "@/application/dtos/student/createStudentInputDTO";
import { CreateStudentReturnDTO } from "@/application/dtos/student/createStudentReturnDTO";
import { UpdateStudentInputDTO } from "@/application/dtos/student/updateStudentInputDTO";
import { UpdateStudentReturnDTO } from "@/application/dtos/student/updateStudentReturnDTO";
import { GetAllStudentsResultDTO } from "../dtos/student/getAllStudentsResultDTO";
import { GetStudentByIdResultDTO } from "../dtos/student/getStudentByIdResultDTO";

interface IStudentServices {
    GetAllAsync: () => Promise<GetAllStudentsResultDTO[]>
    GetByIdAsync: (id: number) => Promise<GetStudentByIdResultDTO | null>
    CreateAsync: (data: CreateStudentInputDTO) => Promise<CreateStudentReturnDTO>
    UpdateAsync: (id: number, data: UpdateStudentInputDTO) => Promise<UpdateStudentReturnDTO>
    DeleteAsync: (id: number) => Promise<boolean>
}

export default IStudentServices