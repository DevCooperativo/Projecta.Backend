import BaseController from "@/api/controllers/baseController";
import { EnsureCorrectFieldsValidationMiddleware } from "@/api/middlewares/ensureCorrectFieldsValidationMiddleware";
import { SigninPayload } from "@/api/middlewares/validations/auth/signinPayload";
import { Router } from "express";
import { container } from "tsyringe";
import EnsureAuthenticatedUserMiddleware from "../middlewares/ensureAuthenticatedUserMiddleware";

export const authRoutes = Router()

const signInController = container.resolve<BaseController>("SignInController")
const meController = container.resolve<BaseController>("MeController")
const logoutController = container.resolve<BaseController>("LogoutController")
authRoutes.post("/signin", EnsureCorrectFieldsValidationMiddleware(SigninPayload), (req, res) => signInController.Handle(req, res))

authRoutes.get("/me", EnsureAuthenticatedUserMiddleware, (req, res) => {
    return meController.Handle(req, res)
})

authRoutes.post("/logout", EnsureAuthenticatedUserMiddleware, (req,res)=>{
    return logoutController.Handle(req,res)
})