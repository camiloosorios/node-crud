import { Router } from 'express';
import { check } from 'express-validator';
import { fieldsValidator, jwtValidator } from '../middlewares';
import { ProductController } from '../controllers';
import { adminRoleValidator } from '../middlewares';

export class ProductRouter {

    private router: Router;
    private productController: ProductController;

    constructor() {
        this.router = Router();
        this.productController = new ProductController();
    }
    
    public getRoutes(): Router {
        
        this.router.get('/', this.productController.findAll);

        this.router.post('/', [
            jwtValidator,
            adminRoleValidator,
            check('name', 'El nombre del producto es requerido')
                .not().isEmpty(),
            check('category', 'La categoria del producto es requerida')
                .not().isEmpty(),
            check('price', 'El precio es requerido y debe ser un número')
                .isNumeric(),
            check('quantity', 'La cantidad es requerida y debe ser un número')
                .isNumeric(),
            fieldsValidator
        ], this.productController.create);

        this.router.patch('/:id', [
            jwtValidator,
            adminRoleValidator,
            check('name', 'El nombre del producto no puede ser vacio')
                .optional().not().isEmpty(),
            check('category', 'La categoría del producto no puede ser vacia')
                .optional().not().isEmpty(),
            check('price', 'El precio debe ser un número')
                .optional().isNumeric(),
            check('quantity', 'La cantidad debe ser un número')
                .optional().isNumeric(),
            fieldsValidator
        ], this.productController.update);

        this.router.delete('/:id', [
            jwtValidator,
            adminRoleValidator,
            fieldsValidator
        ], this.productController.delete);

        return this.router;
    }
}