import { Router } from "express";
import coordinatorRoutes from "./coordinatorRoutes";

const routes = Router()

routes.use("/api/coordinator", coordinatorRoutes)
routes.use()


export default routes