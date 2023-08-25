import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";


const fieldsValidator = (req: Request, res: Response, next: NextFunction): Response | void => {

    const errors = validationResult(req);

    if(!errors.isEmpty()) {

        return res.status(400).json({
            msg: errors.array()[0].msg
        });
    }

    next();

}

export default fieldsValidator;