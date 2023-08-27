import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JsonWebTokenPayload } from '../interfaces';


export const jwtValidator = (req: Request, res: Response, 
    next: NextFunction): Response | void => {
    const { token } = req.headers;

    if(!token) {
        return res.status(401).json({ message:  'El token es requerido'});
    }

    try {
        const payload = jwt.verify(String(token), process.env.SECRET_KEY!) as JsonWebTokenPayload;
        req.body.userId = payload.id;
        next();
    } catch (err) {
        console.error(`Error al validar el token ${err}`);
        return res.status(401).json({ 
            message: 'El token es inválido o ha expirado' 
        });
    }
    
}
