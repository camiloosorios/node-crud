import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, BaseEntity } from "typeorm";
import ProductPurchase from "./ProductPurchase";

@Entity() 
class User extends BaseEntity {

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

  @OneToMany(() => ProductPurchase, purchase => purchase.user)
  purchases: ProductPurchase[];
}

export default User;

