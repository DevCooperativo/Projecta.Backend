import BaseController from "@/api/controllers/baseController";
import { EnsureCorrectFieldsValidationMiddleware } from "@/api/middlewares/ensureCorrectFieldsValidationMiddleware";
import { CreateStudentPayload } from "@/api/middlewares/validations/student/createStudentPayload";
import { UpdateStudentPayload } from "@/api/middlewares/validations/student/updateStudentPayload";
import { DeleteByIdPayload } from "@/api/middlewares/validations/shared/deleteByIdPayload";
import { Router } from "express";
import { container } from "tsyringe";

export const studentRoutes = Router()

const getAllStudentsController = container.resolve<BaseController>("GetAllStudentsController")
const getStudentByIdController = container.resolve<BaseController>("GetStudentByIdController")
const createStudentController = container.resolve<BaseController>("CreateStudentController")
const updateStudentController = container.resolve<BaseController>("UpdateStudentController")
const deleteStudentController = container.resolve<BaseController>("DeleteStudentController")

studentRoutes.get("/", async (req, res) => getAllStudentsController.Handle(req,res))
studentRoutes.get("/:id", async (req, res) => getStudentByIdController.Handle(req,res))
studentRoutes.post("/", EnsureCorrectFieldsValidationMiddleware(CreateStudentPayload), async (req, res) => createStudentController.Handle(req,res))
studentRoutes.put("/:id", EnsureCorrectFieldsValidationMiddleware(UpdateStudentPayload), async (req, res) => updateStudentController.Handle(req,res))
studentRoutes.delete("/:id", EnsureCorrectFieldsValidationMiddleware(DeleteByIdPayload), async (req, res) => deleteStudentController.Handle(req,res))