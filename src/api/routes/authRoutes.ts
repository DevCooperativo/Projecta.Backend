import BaseController from "api/controllers/baseController";
import { Router } from "express";
import { container } from "tsyringe";

export const authRoutes = Router()

const signInController = container.resolve<BaseController>("SignInController")

authRoutes.post("/signin", (req, res, next) => signInController.Handle(req, res, next))