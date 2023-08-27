import { DataSource, EntityManager } from 'typeorm';
import { Product } from '../../entities';
import Database from '../Database';

class ProductSeeder {
  public async run(): Promise<void> {
    
    const productsToCreate = [
      {
        name: 'Gaseosa 1',
        category: 'Gaseosas',
        price: 2200,
        quantity: 30
      },
      {
        name: 'Gaseosa 2',
        category: 'Gaseosas',
        price: 3500,
        quantity: 20
      },
      {
        name: 'Galletas 1',
        category: 'Galletas',
        price: 1500,
        quantity: 50
      },
      {
        name: 'Galletas 2',
        category: 'Galletas',
        price: 1000,
        quantity: 50
      },
    ];

    const dataSource: DataSource = await Database.createDataSource().initialize();
    const entityManager: EntityManager = dataSource.manager;
    try{
  
      const productRepository = entityManager.getRepository(Product);
      const products = productsToCreate.map(productData => productRepository.create(productData));
  
      await entityManager.transaction(async transactionalEntityManager => {
        await transactionalEntityManager.save(products);
      });
    } catch(err) {
      console.error(`Error al ejecutar el seed ${err}`);
    } finally {
        try {          
          entityManager.release();
        } catch(err) {
          console.log(`Error al liberar el EntityManager: ${err}`);
        }
    }
  }
}

const productSeeder = new ProductSeeder();
productSeeder.run();