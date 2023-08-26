import { Router } from "express";
import PurchaseController from '../controllers/PurchaseController';
import validateJsonWebToken from "../helpers/jwtValidator";

class PurchaseRouter {

    private router: Router;
    private purchaseController: PurchaseController;

    constructor() {
        this.router = Router();
        this.purchaseController = new PurchaseController();
    }
    
    public getRoutes(): Router {
        
        this.router.post('/create', validateJsonWebToken, this.purchaseController.create);

        return this.router;
    }
}

export default PurchaseRouter;