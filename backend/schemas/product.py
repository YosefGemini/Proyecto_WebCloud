from pydantic import BaseModel
from uuid import UUID
from schemas import category, file



class ProductBase(BaseModel):
    name: str
    description: str
    characteristics: str
    price: float
    discount: float = None
    quantity: int


class ProductCreate(ProductBase):
    categories: list[UUID] = None
    files: list[UUID] = None


class Product(ProductBase):
    id: UUID
    categories: list[category.Product_Categories]
    files: list[file.File_DB] = None

    class Config:
        orm_mode = True


class ProductUpdate(ProductBase):
    id: str

class ProductDelete(BaseModel):
    id: str