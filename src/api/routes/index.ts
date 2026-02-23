import { Router } from "express";
import coordinatorRoutes from "./coordinatorRoutes";
import professorsRoutes from "./professorRoutes";

const routes = Router()

routes.use("/coordinators", coordinatorRoutes)
routes.use("/professors", professorsRoutes)


export default routes