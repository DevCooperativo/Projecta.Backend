import BaseController from "api/controllers/baseController";
import { Router } from "express";
import { container } from "tsyringe";

export const studentRoutes = Router()

const getAllStudentsController = container.resolve<BaseController>("GetAllStudentsController")
const createStudentController = container.resolve<BaseController>("CreateStudentController")

studentRoutes.get("/", async (req, res) => getAllStudentsController.Handle(req,res))
studentRoutes.post("/", async (req, res) => createStudentController.Handle(req,res))