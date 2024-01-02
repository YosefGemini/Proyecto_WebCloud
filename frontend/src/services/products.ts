import { Category } from "./category";
import { Files } from "./files";

export interface Product {
  name: string;
  description: string;
  characteristics: string;
  price: number;
  discount: number;
  quantity: number;
  id: string;
  categories: [Category];
  files: [Files];
}
export interface ProductCreate {
  name: string;
  description: string;
  characteristics: string[];
  price: number;
  discount: number;
  quantity: number;
  categories: [string];
  files: [string];
}

export interface ProductUpdate {
  name: string;
  description: string;
  characteristics: string;
  price: number;
  discount?: number;
  quantity: number;
  id: string;
}

export interface ProductDelete {
  id: string;
}

export async function get_all_products() {
  try {
    const res = await fetch(`/api/products`, {
      method: "GET",
    });
    if (res.status === 200) {
      
      return res;
    }
    return null;
  } catch (error) {
    return null;
  }
}

export async function get_product_by_id(id: string) {
  try {
    const res = await fetch(`/api/products/${id}`, {
      method: "GET",
    });
    if (res.status === 200) {
      const data = await res.json();
      return data;
    }
    return null;
  } catch (error) {
    return null;
  }
}

export async function create_product(product: ProductCreate) {
  try {
    const res = await fetch(`/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...product }),
    });
    if (res.status === 200) {
      return res;
    }
    return null;
  } catch (error) {
    return null;
  }
}

export async function update_product(product: ProductUpdate) {
  try {
    const res = await fetch(`/api/products`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...product }),
    });
    if (res.status === 200) {
      return res;
    }
    return null;
  } catch (error) {
    return null;
  }
}

export async function delete_product(product: ProductDelete) {
  try {
    const res = await fetch(`/api/products`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...product }),
    });
    if (res.status === 200) {
      return res;
    }
    return null;
  } catch (error) {
    return null;
  }
}
