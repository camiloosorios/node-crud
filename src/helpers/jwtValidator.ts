import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const validateJsonWebToken = (req: Request, res: Response, next: NextFunction): Response | void => {

    const { token } = req.body;

    if(!token) {
        return res.status(401).json({ message:  "El token es requerido"});
    }

    jwt.verify(token, process.env.SECRET_KEY!, (err: Error | null) => {
        if (err) {
            return res.status(401).json({ message: 'El token es inválido o ha expirado' });
        } else {
            next();
        }
    });
    
}

export default validateJsonWebToken;