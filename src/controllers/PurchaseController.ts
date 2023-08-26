import { Request, Response } from "express";
import Product from "../entities/Product";
import ProductPurchase from "../entities/ProductPurchase";
import User from "../entities/User";
import { ProductRequest } from "../interfaces/ProductRequestInterface";

class PurchaseController {
    
    public async create(req: Request, res: Response): Promise<Response> {
        
        const { products, userId }: { products: ProductRequest[], userId: number } = req.body;
        
        try {
            const user: User | null = await User.findOneBy({ id: userId });
            
            if(user && products) {  
                const productsId: number[] = products.map(product => product.id);

                const selectedProducts: Product[] = await Product.createQueryBuilder("product")
                                                .select(["product.id", "product.name", "product.category", "product.price", "product.quantity"])
                                                .where("product.id IN (:...ids)", { ids: productsId })
                                                .andWhere("product.enabled = :enabled", { enabled: true })
                                                .getMany();

                if (selectedProducts.length !== productsId.length) {
                    const productsNotIncluded: number[] = productsId.filter(productId => !selectedProducts.some(product => product.id === productId));
                    return res.status(400).json({ message: `ids[ ${productsNotIncluded} ] no corresponden a productos existentes` });
                }

                selectedProducts.forEach(selectedProduct => {
                    const matchingProduct = products.find(product => product.id === selectedProduct.id);
                    if (matchingProduct) {
                        if (matchingProduct.quantity > selectedProduct.quantity) {
                            return res.status(400).json({ message: `No hay suficientes existencias para el producto con ID ${selectedProduct.id}` });
                        }
                        selectedProduct.quantity = matchingProduct.quantity;
                    }
                });

                // if (user.money < total) {
                //     return res.status(400).json({ message: "Saldo insuficiente, no te alcanza para la compra!" });
                // }

                const total = selectedProducts.reduce((subTotal, product) => subTotal + product.price * product.quantity, 0);
    
                const purchase: ProductPurchase = new ProductPurchase();
                purchase.products = selectedProducts;
                purchase.total = total;
                purchase.user = user;
                
                // await purchase.save();
    
                return res.json({ message: "Compra realizada correctamente", purchase });
            }

            return res.status(400).json({ message: "El usuario y/o productos no existen" });

        } catch (err) {
            console.error("Error al realizar la compra: " + err);
            return res.status(500).json({ message: "Error en el servidor, comuniquese con un administrador" });
        }
    }
}

export default PurchaseController;
