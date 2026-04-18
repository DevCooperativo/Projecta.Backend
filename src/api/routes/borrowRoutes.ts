import BaseController from "api/controllers/baseController";
import { Router } from "express";
import { container } from "tsyringe";

export const borrowRoutes = Router()
const createBorrowController = container.resolve<BaseController>("CreateBorrowController")

borrowRoutes.post("/", (req, res, next) => createBorrowController.Handle(req, res, next))