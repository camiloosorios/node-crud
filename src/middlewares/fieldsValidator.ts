import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

export const fieldsValidator = (req: Request, res: Response, 
    next: NextFunction): Response | void => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        const { msg } = errors.array()[0];

        return res.status(400).json({ msg });
    }
    next();
}