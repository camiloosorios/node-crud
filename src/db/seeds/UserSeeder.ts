import { DataSource, EntityManager } from 'typeorm';
import { User } from '../../entities';
import { UserRoles } from '../../enums/UserRoles';
import Database from '../Database';

class UserSeeder {
  public async run(): Promise<void> {
    
    const usersToCreate = [
      {
        name: 'Nombre de Usuario 1',
        money: 100000,
        email: 'usuario1@example.com',
        password: 'contraseña1',
        role: UserRoles.ADMIN,
      },
      {
        name: 'Nombre de Usuario 2',
        money: 150000,
        email: 'usuario2@example.com',
        password: 'contraseña2',
        role: UserRoles.USER,
      },
    ];

    const dataSource: DataSource = await Database.createDataSource().initialize();
    const entityManager: EntityManager = dataSource.manager;
    try{
  
      const userRepository = entityManager.getRepository(User);
      const users = usersToCreate.map(userData => userRepository.create(userData));
  
      await entityManager.transaction(async transactionalEntityManager => {
        await transactionalEntityManager.save(users);
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

const userSeeder = new UserSeeder();
userSeeder.run();