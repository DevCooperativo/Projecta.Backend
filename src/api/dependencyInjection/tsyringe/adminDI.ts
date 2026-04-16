import IAdministratorRepository from "domain/repositories/iAdministratorRepository";

import IAdministratorServices from "application/interfaces/iAdministratorServices";
import AdministratorServices from "application/services/administratorServices";
import AdministratorRepository from "infrastructure/repositories/administratorRepository";
import { container } from "tsyringe";



export const adminDI = () => {
container.registerSingleton<IAdministratorRepository>("AdministratorRepository", AdministratorRepository)
container.registerSingleton<IAdministratorServices>("AdministratorServices", AdministratorServices)

}