import jwt from 'jsonwebtoken';
import { JsonWebTokenPayload } from '../interfaces';

export const generateToken = (payload: JsonWebTokenPayload, key: string): string => {
    return jwt.sign(payload, key, {
        expiresIn: process.env.JWT_EXPIRATION_TIME
    });

}