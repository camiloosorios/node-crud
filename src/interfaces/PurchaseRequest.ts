import { ProductRequest } from './ProductRequest';

export interface PurchaseRequest {
    products: ProductRequest[], 
    userId: number
}