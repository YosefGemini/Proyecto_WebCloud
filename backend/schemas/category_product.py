from pydantic import BaseModel
from uuid import UUID
from schemas import file

class ProductBase(BaseModel):
    name: str
    description: str
    characteristics: str
    price: float
    discount: float = None
    quantity: int


class Product(ProductBase):
    id: UUID
    #categories: list[category.Category] = None
    files: list[file.File_DB] = None

    class Config:
        orm_mode = True

