import BaseController from "@/api/controllers/baseController";
import { EnsureCorrectFieldsValidationMiddleware } from "@/api/middlewares/ensureCorrectFieldsValidationMiddleware";
import { CreateBorrowPayload } from "@/api/middlewares/validations/borrow/createBorrowPayload";
import { UpdateBorrowPayload } from "@/api/middlewares/validations/borrow/updateBorrowPayload";
import { DeleteByIdPayload } from "@/api/middlewares/validations/shared/deleteByIdPayload";
import { Router } from "express";
import { container } from "tsyringe";

export const borrowRoutes = Router()
const getAllBorrowsController = container.resolve<BaseController>("GetAllBorrowsController")
const getBorrowByIdController = container.resolve<BaseController>("GetBorrowByIdController")
const createBorrowController = container.resolve<BaseController>("CreateBorrowController")
const updateBorrowController = container.resolve<BaseController>("UpdateBorrowController")
const deleteBorrowController = container.resolve<BaseController>("DeleteBorrowController")

borrowRoutes.get("/", (req, res) => getAllBorrowsController.Handle(req, res))
borrowRoutes.get("/:id", (req, res) => getBorrowByIdController.Handle(req, res))
borrowRoutes.post("/", EnsureCorrectFieldsValidationMiddleware(CreateBorrowPayload), (req, res) => createBorrowController.Handle(req, res))
borrowRoutes.put("/:id", EnsureCorrectFieldsValidationMiddleware(UpdateBorrowPayload), (req, res) => updateBorrowController.Handle(req, res))
borrowRoutes.delete("/:id", EnsureCorrectFieldsValidationMiddleware(DeleteByIdPayload), (req, res) => deleteBorrowController.Handle(req, res))