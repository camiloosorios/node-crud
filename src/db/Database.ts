import { DataSource } from 'typeorm';
import { Product, ProductPurchase, User} from '../entities';

class Database {

  public static createDataSource(): DataSource {
    return new DataSource({
      type: 'postgres',
      host: 'db',
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      logging: true,
      entities: [User, Product, ProductPurchase]
    });
  }


}

export default Database;