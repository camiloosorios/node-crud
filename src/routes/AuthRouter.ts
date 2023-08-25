import { Router } from "express";
import { check } from "express-validator";
import AuthController from '../controllers/AuthController';
import fieldsValidator from "../helpers/fieldsValidator";

class AuthRouter {

    private router: Router;
    private authController: AuthController;

    constructor() {
        this.router = Router();
        this.authController = new AuthController();
    }
    
    public getRoutes(): Router {
        
        this.router.post('/login', [
            check('email', 'Correo Electrónico Inválido').isEmail(),
            check('password', 'La contraseña debe tener min. 6 caractéres').isLength({ min: 6 }),
            fieldsValidator
        ], this.authController.login);

        this.router.post('/register', [
            check('name', 'El nombre es requerido').not().isEmpty(),
            check('email', 'Correo Electrónico es requerido').not().isEmpty(),
            check('email', 'Correo Electrónico Inválido').isEmail(),
            check('password', 'La contraseña debe tener min. 6 caractéres').isLength({ min: 6 }),
            check('money', 'El campo dinero debe ser un número').isNumeric(),
            fieldsValidator
        ], this.authController.register);
        
        return this.router;
    }
}

export default AuthRouter;