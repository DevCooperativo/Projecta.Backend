import { Router } from "express";
import coordinatorRoutes from "./coordinatorRoutes";
import professorsRoutes from "./professorRoutes";
import coordinationRoutes from "./coordinationRoutes";
import projectRoutes from "./projectRoutes";
import researcherRoutes from "./researcherRoutes";

const routes = Router()

routes.use("/coordinators", coordinatorRoutes)
routes.use("/professors", professorsRoutes)
routes.use("/coordinations", coordinationRoutes)
routes.use("/projects", projectRoutes)
routes.use("/researchers", researcherRoutes)


export default routes