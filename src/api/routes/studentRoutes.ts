import BaseController from "@/api/controllers/baseController";
import { EnsureCorrectFieldsValidationMiddleware } from "@/api/middlewares/ensureCorrectFieldsValidationMiddleware";
import { CreateStudentPayload } from "@/api/middlewares/validations/student/createStudentPayload";
import { UpdateStudentPersonalDataPayload } from "@/api/middlewares/validations/student/updateStudentPersonalDataPayload";
import { UpdateStudentTermPayload } from "@/api/middlewares/validations/student/updateStudentTermPayload";
import { UpdateStudentShiftPayload } from "@/api/middlewares/validations/student/updateStudentShiftPayload";
import { DeleteByIdPayload } from "@/api/middlewares/validations/shared/deleteByIdPayload";
import { Router } from "express";
import { container } from "tsyringe";
import { EnsureUserRoleMiddleware } from "../middlewares/ensureUserRoleMiddleware";
import { AccountType } from "@/infrastructure/authentication/constants/accountType";
import EnsureAuthenticatedUserMiddleware from "../middlewares/ensureAuthenticatedUserMiddleware";

export const studentRoutes = Router()

const getAllStudentsController = container.resolve<BaseController>("GetAllStudentsController")
const getStudentByIdController = container.resolve<BaseController>("GetStudentByIdController")
const createStudentController = container.resolve<BaseController>("CreateStudentController")
const updateStudentPersonalDataController = container.resolve<BaseController>("UpdateStudentPersonalDataController")
const updateStudentTermController = container.resolve<BaseController>("UpdateStudentTermController")
const updateStudentShiftController = container.resolve<BaseController>("UpdateStudentShiftController")
const deleteStudentController = container.resolve<BaseController>("DeleteStudentController")

studentRoutes.get("/", async (req, res) => getAllStudentsController.Handle(req, res))
studentRoutes.get("/:id", async (req, res) => getStudentByIdController.Handle(req, res))
studentRoutes.post("/", EnsureCorrectFieldsValidationMiddleware(CreateStudentPayload), async (req, res) => createStudentController.Handle(req, res))
studentRoutes.put("/personal-data", EnsureAuthenticatedUserMiddleware, EnsureCorrectFieldsValidationMiddleware(UpdateStudentPersonalDataPayload), EnsureUserRoleMiddleware([AccountType.student]), async (req, res) => updateStudentPersonalDataController.Handle(req, res))
studentRoutes.put("/term", EnsureAuthenticatedUserMiddleware, EnsureCorrectFieldsValidationMiddleware(UpdateStudentTermPayload), EnsureUserRoleMiddleware([AccountType.student]), async (req, res) => updateStudentTermController.Handle(req, res))
studentRoutes.put("/shift", EnsureAuthenticatedUserMiddleware, EnsureCorrectFieldsValidationMiddleware(UpdateStudentShiftPayload), EnsureUserRoleMiddleware([AccountType.student]), async (req, res) => updateStudentShiftController.Handle(req, res))
studentRoutes.delete("/:id",EnsureAuthenticatedUserMiddleware, EnsureCorrectFieldsValidationMiddleware(DeleteByIdPayload), EnsureUserRoleMiddleware([AccountType.student]), async (req, res) => deleteStudentController.Handle(req, res))
