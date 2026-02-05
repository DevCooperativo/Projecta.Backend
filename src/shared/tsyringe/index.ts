import CoordinatorController from "@/api/controllers/coordinatorControlller";
import { container } from "tsyringe";

container.registerSingleton<BaseController>("CoordinatorController", CoordinatorController)