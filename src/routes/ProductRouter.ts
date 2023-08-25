import { Router } from "express";
import { check } from "express-validator";
import validateJsonWebToken from "../helpers/jwtValidator";
import ProductController from '../controllers/ProductController';
import fieldsValidator from "../helpers/fieldsValidator";

class ProductRouter {

    private router: Router;
    private productController: ProductController;

    constructor() {
        this.router = Router();
        this.productController = new ProductController();
    }
    
    public getRoutes(): Router {
        
        this.router.get('/', this.productController.show);

        this.router.post('/create', [
            validateJsonWebToken,
            check('name', 'El nombre del producto es requerido').not().isEmpty(),
            check('category', 'La categoria del producto es requerida').not().isEmpty(),
            check('price', 'El precio es requerido y debe ser un número').isNumeric(),
            check('quantity', 'La cantidad es requerida y debe ser un número').isNumeric(),
            fieldsValidator
        ], this.productController.create);

        this.router.put('/update/:id', [
            validateJsonWebToken,
            check('name', 'El nombre del producto no puede ser vacio').optional().not().isEmpty(),
            check('category', 'La categoría del producto no puede ser vacia').optional().not().isEmpty(),
            check('price', 'El precio debe ser un número').optional().isNumeric(),
            check('quantity', 'La cantidad debe ser un número').optional().isNumeric(),
            fieldsValidator
        ], this.productController.update);

        this.router.delete('/delete/:id', validateJsonWebToken, this.productController.delete);

        return this.router;
    }
}

export default ProductRouter;