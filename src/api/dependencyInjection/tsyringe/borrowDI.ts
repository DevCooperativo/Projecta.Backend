import BaseController from "api/controllers/baseController"
import { CreateBorrowController } from "api/controllers/borrow/createBorrowController"
import { container } from "tsyringe"

export const borrowDI = () =>{
    container.registerSingleton<BaseController>("CreateBorrowController", CreateBorrowController)
}