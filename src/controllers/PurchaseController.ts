import { Request, Response } from 'express';
import { DataSource } from 'typeorm';
import { Product, ProductPurchase, User } from '../entities';
import { ProductRequest, PurchaseRequest } from '../interfaces';
import { PurchaseValidateError } from '../helpers';
import Database from '../db/Database';

export class PurchaseController {

    constructor() {
        this.create = this.create.bind(this);
    }

    public async create(req: Request, res: Response): Promise<Response> {
        const { products, userId }: PurchaseRequest = req.body;
        const dataSource: DataSource = await Database.createDataSource().initialize();
        const queryRunner = dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const user: User | null = await User.findOneBy({ id: userId });
            
            if (!user) {
                return res.status(404).json({
                    message: `El usuario con ID ${userId} no existe`
                });
            }
            
            const selectedProducts: Product[] = await this.findSelectedProducts(products);

            if(selectedProducts.length != products.length) {
                return res.status(400).json({
                    message: 'Algunos de los productos ingresados no existen'
                });
            }

            this.validateProductExistence(selectedProducts, products);
            this.validateUserBalance(user, selectedProducts, products);
            this.updateProductQuantities(selectedProducts, products);

            const total = this.calculateTotal(selectedProducts, products);

            this.updateUserMoney(user, total);

            const purchase: ProductPurchase = new ProductPurchase();
            purchase.products = selectedProducts;
            purchase.total = total;
            purchase.user = user;

            await purchase.save();

            await queryRunner.commitTransaction();

            return res.json({ message: 'Compra realizada exitosamente' });
        } catch (err) {
            await queryRunner.rollbackTransaction();

            if(err instanceof PurchaseValidateError) {
                return res.status(400).json({ 
                    message: err.message 
                });
            }

            console.error(`Error al realizar la compra: ${err}`);
            return res.status(500).json({ 
                message: 'Error en el servidor, comuníquese con un administrador' 
            });
        } finally {
            try {
                if (queryRunner) {
                    await queryRunner.release();
                }
            } catch (err) {
                console.error(`Error al liberar el queryRunner: ${err}`);
            }
        } 
    }

    private async findSelectedProducts(products: ProductRequest[]): Promise<Product[]> {
        const productsId: number[] = products.map(product => product.id);
        const productColumns: string[] = ['product.id', 'product.name', 'product.category', 
        'product.price', 'product.quantity'];
        
        const selectedProducts: Product[] = await Product.createQueryBuilder('product')
            .select(productColumns)
            .where('product.id IN (:...ids)', { ids: productsId })
            .andWhere('product.enabled = :enabled', { enabled: true })
            .getMany();

        return selectedProducts;
    }

    private validateProductExistence(selectedProducts: Product[], 
        requestedProducts: ProductRequest[]): void {
        for (const selectedProduct of selectedProducts) {
            const matchingProduct = requestedProducts
                .find(product => product.id === selectedProduct.id);

            if (matchingProduct && matchingProduct.quantity > selectedProduct.quantity) {
                throw new PurchaseValidateError( 
                    `No hay suficientes existencias para el producto con ID: ${selectedProduct.id}`
                );            
            }
        }
    }

    private validateUserBalance(user: User, selectedProducts: Product[], 
        requestedProducts: ProductRequest[]): void {
        const total = this.calculateTotal(selectedProducts, requestedProducts);
        
        if (user.money < total) {
            throw new PurchaseValidateError(
                'Saldo insuficiente, no tienes suficiente dinero para la compra'
            );
        }
    }    
    
    private async updateProductQuantities(selectedProducts: Product[], 
        requestedProducts: ProductRequest[]): Promise<void> {
        await Promise.all(selectedProducts.map(async selectedProduct => {
            const matchingProduct = requestedProducts
                .find(product => product.id === selectedProduct.id);

            if (matchingProduct) {
                selectedProduct.quantity -= matchingProduct.quantity;
                await selectedProduct.save();
            }
        }));
    }
    
    private async updateUserMoney(user: User, total: number): Promise<void> {
        user.money -= total;
        await user.save();
    }

    private calculateTotal(products: Product[], 
        requestedProducts: ProductRequest[]): number {
        return requestedProducts.reduce((total, requestedProduct) => {
            const matchingProduct = products
                .find(product => product.id === requestedProduct.id);

            if (matchingProduct) {
                return total + matchingProduct.price * requestedProduct.quantity;
            }
            return total;
        }, 0);
    }

}
