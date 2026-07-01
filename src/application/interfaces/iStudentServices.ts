import { CreateStudentInputDTO } from "@/application/dtos/student/createStudentInputDTO";
import { CreateStudentReturnDTO } from "@/application/dtos/student/createStudentReturnDTO";
import { UpdateStudentInputDTO } from "@/application/dtos/student/updateStudentInputDTO";
import { UpdateStudentReturnDTO } from "@/application/dtos/student/updateStudentReturnDTO";
import { GetAllStudentsResultDTO } from "../dtos/student/getAllStudentsResultDTO";
import { GetStudentByIdResultDTO } from "../dtos/student/getStudentByIdResultDTO";
import { StudentDTO } from "../dtos/student/studentDTO";
import { ChangeStudentTermInputDTO } from "../dtos/student/changeStudentTermInputDTO";
import { ChangeStudentShiftInputDTO } from "../dtos/student/changeStudentShiftInputDTO";

interface IStudentServices {
    GetAllAsync: () => Promise<GetAllStudentsResultDTO[]>
    GetByIdAsync: (id: number) => Promise<GetStudentByIdResultDTO | null>
    GetByEmailAsync: (email: string) => Promise<StudentDTO | null>
    CreateAsync: (data: CreateStudentInputDTO) => Promise<CreateStudentReturnDTO>
    UpdateAsync: (data: UpdateStudentInputDTO) => Promise<UpdateStudentReturnDTO>
    ChangeTermAsync: (data: ChangeStudentTermInputDTO) => Promise<StudentDTO>
    ChangeShiftAsync: (data: ChangeStudentShiftInputDTO) => Promise<StudentDTO>
    DeleteAsync: (id: number) => Promise<boolean>
}

export default IStudentServices
