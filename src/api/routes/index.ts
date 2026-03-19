import { Router } from "express";
import coordinatorRoutes from "./coordinatorRoutes";
import professorsRoutes from "./professorRoutes";
import coordinationRoutes from "./coordinationRoutes";

const routes = Router()

routes.use("/coordinators", coordinatorRoutes)
routes.use("/professors", professorsRoutes)
routes.use("/coordinations", coordinationRoutes)


export default routes