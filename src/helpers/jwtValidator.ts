import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JsonWebTokenPayload } from "../interfaces/JWTInterface";


const validateJsonWebToken = (req: Request, res: Response, next: NextFunction): Response | void => {

    const { token } = req.body;

    if(!token) {
        return res.status(401).json({ message:  "El token es requerido"});
    }

    try {
        const payload = jwt.verify(String(token), process.env.SECRET_KEY!) as JsonWebTokenPayload;
        req.body.userId = payload.id;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'El token es inválido o ha expirado' });
    }
    
}

export default validateJsonWebToken;
