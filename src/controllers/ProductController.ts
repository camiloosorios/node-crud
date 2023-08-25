import { Request, Response } from "express";

class ProductController {
    
    public async show(req: Request, res: Response): Promise<Response> {
        return res.json({
            msg: 'mostrar'
        });
    }

    public async create(req: Request, res: Response): Promise<Response> {
        return res.json({
            msg: 'Crear'
        });
    }

    public async update(req: Request, res: Response): Promise<Response> {
        return res.json({
            msg: 'actualizar'
        });
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        return res.json({
            msg: 'borrar'
        });
    }
}

export default ProductController;

