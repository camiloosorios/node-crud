import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne, BaseEntity } from "typeorm";
import  Product  from "./Product";
import User from "./User";

@Entity()
class ProductPurchase extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Product)
  @JoinTable()
  products: Product[];

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  purchaseDate: Date;

  @Column()
  total: number;

  @ManyToOne(() => User, user => user.purchases)
  user: User;
}

export default ProductPurchase;