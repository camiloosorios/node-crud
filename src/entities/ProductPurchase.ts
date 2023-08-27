import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne, BaseEntity, JoinColumn } from 'typeorm';
import { Product } from './';
import { User } from './';

@Entity({ name: 'product_purchases' })
export class ProductPurchase extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Product)
  @JoinTable({
    name: 'product_purchase_product',
    joinColumns: [{ name: 'product_purchase_id' }],
    inverseJoinColumns: [{ name: 'product_id' }]
  })
  products: Product[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'purchase_date' })
  purchaseDate: Date;

  @Column()
  total: number;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => User, user => user.purchases)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
