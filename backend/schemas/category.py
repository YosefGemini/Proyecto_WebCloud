from pydantic import BaseModel
from uuid import UUID
from schemas import category_product


class CategoryBase(BaseModel):
    name: str
    description: str

class CategoryCreate(CategoryBase):
    pass


class Product_Categories(CategoryBase):
    id: UUID

    class Config:
        orm_mode = True

class Category(CategoryBase):
    id: UUID
    products: list[category_product.Product] = None

    class Config:
        orm_mode = True

class CategoryUpdate(CategoryBase):
    id: str

class CategoryDelete(BaseModel):
    id: str