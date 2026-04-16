import StudentRepository from "infrastructure/repositories/studentRepository";

import IStudentRepository from "domain/repositories/iStudentRepository";

import StudentServices from "application/services/studentServices";

import IStudentServices from "application/interfaces/iStudentServices";
import { container } from "tsyringe";
import CreateStudentController from "api/controllers/student/createStudentController";
import GetAllStudentsController from "api/controllers/student/getAllStudentsController";



export const studentDI = () => {
    container.registerSingleton<IStudentRepository>("StudentRepository", StudentRepository)
    container.registerSingleton<IStudentServices>("StudentServices", StudentServices)
    container.registerSingleton("GetAllStudentsController", GetAllStudentsController)
    container.registerSingleton("CreateStudentController", CreateStudentController)
}