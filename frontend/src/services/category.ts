import { Product } from "./products";

export interface Category {
  id: string;
  name: string;
  description: string;
  products: Product[];
}
export interface CategoryCreate {
  name: string;
  description: string;
}
export interface CategoryUpdate {
  id: string;
  name: string;
  description: string;
}

export async function getAllCategories() {
  try {
    const res = await fetch("/api/categories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status === 200) {
      return res;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getCategoryById(id: string) {
  try {
    const res = await fetch(`/api/categories/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 200) {
      return;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function createCategory(category: CategoryCreate) {
  try {
    const res = await fetch("/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    });
    if (res.status === 200) {
      return res;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updateCategory(category: CategoryUpdate) {
  try {
    const res = await fetch("/api/categories", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...category }),
    });

    if (res.status === 200) {
      return res;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function deleteCategory(id: string) {
    try {
        const res = await fetch(`/api/categories`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({id: id}),
        });
    
        if (res.status === 200) {
        return res;
        }
        return null;
    } catch (error) {
        console.log(error);
        return null;
    }
}
