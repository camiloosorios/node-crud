import jwt from "jsonwebtoken";
import { JsonWebTokenPayload } from "../interfaces/JWTInterface";

const generateToken = (payload: JsonWebTokenPayload, key: string): string => {

    return jwt.sign(payload, key, {
        expiresIn: '1h'
    });

}

export default generateToken;