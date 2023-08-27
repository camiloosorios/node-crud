import { Request, Response } from 'express';
import { Product } from '../entities';

export class ProductController {
    
    public async findAll(req: Request, res: Response): Promise<Response> {        
        try {
            const products: Product[] = await Product.find({ 
                select: ['id', 'name', 'category', 'price', 'quantity'], 
                where: { enabled: true } });
            return res.json(products);
        } catch(err) {
            console.error(`Error obteniendo productos ${err}`);
            return res.status(500).json({ 
                message: 'Error en el servidor, comuniquese con un administrador' 
            });
        }
        
    }

    public async create(req: Request, res: Response): Promise<Response> {        
        const { name, category, price, quantity } = req.body;
        const product: Product = new Product();

        product.name = name;
        product.category = category;
        product.price = price;
        product.quantity = quantity;

        try {
            await product.save();
            return res.status(201).json({ 
                message: 'Producto creado satisfactoriamente' 
            });
        } catch (err) {
            console.error('Error creando producto: ' + err);
            return res.status(500).json({ 
                message: 'Error en el servidor, comuniquese con un administrador' 
            });
        }
        
    }

    public async update(req: Request, res: Response): Promise<Response> {        
        const { name, category, price, quantity } = req.body;
        const id: number = Number(req.params.id);

        try {
            const product: Product | null = await Product.findOneBy({ id, enabled: true });

            if (product) {
                product.name = name;
                product.category = category;
                product.price = price;
                product.quantity = quantity;

                await product.save();

                return res.json({ 
                    message: 'Producto Actualizado correctamente' 
                });
            }
            return res.status(404).json({ message: `Producto con id ${id} no existe` })

        }catch(err) {
            console.error('Error actualizando producto: ' + err);
            return res.status(500).json({ 
                message: 'Error en el servidor, comuniquese con un administrador'
            });
        }
    } 

    public async delete(req: Request, res: Response): Promise<Response> {        
        const id: number = Number(req.params.id);

        try {
            const product: Product | null = await Product.findOneBy({ id, enabled: true });
    
            if (product) {
                product.enabled = false;
                await product.save();
    
                return res.json({ 
                    message: 'Producto eliminado correctamente' 
                });
            }
            return res.status(404).json({ 
                message: `Producto con id ${id} no existe` 
            });

        } catch(err) {
            console.error(`Error eliminando producto: ${err}`);
            return res.status(500).json({ 
                message: 'Error en el servidor, comuniquese con un administrador'
            });
        }
    }
}

