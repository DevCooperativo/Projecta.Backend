import { NextFunction, Request, Response } from "express";

abstract class BaseController {
    abstract Handle(req: Request, res: Response, next: NextFunction): Promise<void>
}
export default BaseController
