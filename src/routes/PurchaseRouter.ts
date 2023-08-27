import { Router } from 'express';
import { PurchaseController } from '../controllers';
import { fieldsValidator, jwtValidator } from '../middlewares';

export class PurchaseRouter {

    private router: Router;
    private purchaseController: PurchaseController;

    constructor() {
        this.router = Router();
        this.purchaseController = new PurchaseController();
    }
    
    public getRoutes(): Router {        
        this.router.post('/', [
            jwtValidator,
            fieldsValidator
        ], this.purchaseController.create);

        return this.router;
    }
}