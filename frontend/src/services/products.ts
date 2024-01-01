import { Category } from "./category";

export interface Product {
    id: string;
    name: string;
    price: number;
    images: string[];
    description: string;
    categories?: Category[];
    characteristics?: string[];

}