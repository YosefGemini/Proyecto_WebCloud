from pydantic import BaseModel
from uuid import UUID


class CategoryBase(BaseModel):
    name: str
    description: str

class CategoryCreate(CategoryBase):
    pass

class Category(CategoryBase):
    id: UUID
    products: list[UUID] = None

    class Config:
        orm_mode = True

class CategoryUpdate(CategoryBase):
    id: str

class CategoryDelete(BaseModel):
    id: str