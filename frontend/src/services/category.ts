import { Product } from "./products";

export interface Category {
    id: string;
    name: string;
    description: string;
    products: Product[];
    
}