import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from 'typeorm';
import { ProductPurchase } from './';
import { UserRoles } from '../enums/UserRoles';

@Entity({ name: 'users' }) 
export class User extends BaseEntity {

  @PrimaryGeneratedColumn() 
  id: number;

  @Column({ unique: true }) 
  name: string;

  @Column()
  money: number;

  @Column({ unique: true }) 
  email: string;

  @Column() 
  password: string;

  @Column({
    type: 'enum',
    enum: UserRoles,
    default: UserRoles.USER,
  })
  role: UserRoles;

  @OneToMany(() => ProductPurchase, purchase => purchase.user)
  purchases: ProductPurchase[];
}


