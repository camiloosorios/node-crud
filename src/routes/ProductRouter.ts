import { Router } from "express";
import ProductController from '../controllers/ProductController';

class ProductRouter {

    private router: Router;
    private productController: ProductController;

    constructor() {
        this.router = Router();
        this.productController = new ProductController();
    }
    
    public getRoutes(): Router {
        
        this.router.post('/', this.productController.show);
        this.router.post('/create', this.productController.create);
        this.router.post('/update', this.productController.update);
        this.router.post('/delete', this.productController.delete);

        return this.router;
    }
}

export default ProductRouter;