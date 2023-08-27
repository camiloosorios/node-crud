import express, { Application } from 'express';
import cors from 'cors';
import Database from './db/Database';
import { AuthRouter, ProductRouter, PurchaseRouter } from './routes';
import { DataSource } from 'typeorm';

class Server {

  private app: Application;
  private port: string;

  constructor() {
    this.app = express();
    this.port = process.env.APP_PORT || '8080';

    this.setupMiddlewares();
    this.setupRoutes();
    this.connectToDatabase();
  }

  private setupMiddlewares(): void {
    this.app.use(cors());
    this.app.use(express.json());
  }

  private setupRoutes(): void {

    const authRouter = new AuthRouter();
    const productRouter = new ProductRouter();
    const purchaseRouter = new PurchaseRouter();

    this.app.use('/auth', authRouter.getRoutes());
    this.app.use('/products', productRouter.getRoutes());
    this.app.use('/purchases', purchaseRouter.getRoutes());
  }

  private async connectToDatabase(): Promise<void> {
    try {
        
        await Database.createDataSource()
          .initialize()
          .then(()=> console.log('Database conected'));

    } catch (error) {

        console.error(`Error connecting to database: ${error}`);

    }
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto ${this.port}`);
    });
  }
}

export default Server;