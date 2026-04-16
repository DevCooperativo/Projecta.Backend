import { Router } from "express";
import coordinatorRoutes from "./coordinatorRoutes";
import professorsRoutes from "./professorRoutes";
import coordinationRoutes from "./coordinationRoutes";
import projectRoutes from "./projectRoutes";
import researcherRoutes from "./researcherRoutes";
import laboratoriesRoutes from "./laboratoryRoutes";
import projectCategoriesRoutes from "./projectCategoryRoutes";
import equipmentCategoriesRoutes from "./equipmentCategoryRoutes";
import equipmentsRoutes from "./equipmentRoutes";
import { studentRoutes } from "./studentRoutes";
import { authRoutes } from "./authRoutes";
import { borrowRoutes } from "./borrowRoutes";

const routes = Router()

routes.use("/auth", authRoutes)
routes.use("/borrow", borrowRoutes)
routes.use("/students", studentRoutes)
routes.use("/coordinators", coordinatorRoutes)
routes.use("/professors", professorsRoutes)
routes.use("/coordinations", coordinationRoutes)
routes.use("/projects", projectRoutes)
routes.use("/researchers", researcherRoutes)
routes.use("/laboratories", laboratoriesRoutes)
routes.use("/projectCategories", projectCategoriesRoutes)
routes.use("/equipmentCategories", equipmentCategoriesRoutes)
routes.use("/equipments", equipmentsRoutes)

export default routes