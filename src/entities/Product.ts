import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
class Product extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  category: string;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @Column({ default: true })
  enabled: boolean;
}

export default Product;