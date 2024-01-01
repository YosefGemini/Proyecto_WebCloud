from pydantic import BaseModel
from uuid import UUID


class ProductBase(BaseModel):
    name: str
    description: str
    characteristics: str


class ProductCreate(ProductBase):
    categories: list[UUID] 
    files: list[UUID] = None


class Product(ProductBase):
    id: UUID
    categories: list[UUID] = None
    files: list[UUID] = None

    class Config:
        orm_mode = True


class ProductUpdate(ProductBase):
    id: str

class ProductDelete(BaseModel):
    id: str