import { Request, Response } from "express";

abstract class BaseController {
    abstract Handle(req: Request, res: Response): Promise<Response>
}
export default BaseController
