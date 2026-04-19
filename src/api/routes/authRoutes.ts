import BaseController from "@/api/controllers/baseController";
import { EnsureCorrectFieldsValidationMiddleware } from "@/api/middlewares/ensureCorrectFieldsValidationMiddleware";
import { SigninPayload } from "@/api/middlewares/validations/auth/signinPayload";
import { Router } from "express";
import { container } from "tsyringe";

export const authRoutes = Router()

const signInController = container.resolve<BaseController>("SignInController")

authRoutes.post("/signin", EnsureCorrectFieldsValidationMiddleware(SigninPayload), (req, res) => signInController.Handle(req, res))