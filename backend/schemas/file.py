

from pydantic import BaseModel
from uuid import UUID

class FileBase(BaseModel):
    name: str
    path: str
    

class FileCreate(FileBase):
    product_id: str
class File_DB(FileBase):
    id: UUID

    class Config:
        orm_mode = True

class FileUpdate(FileCreate):
    id: str

class FileDelete(BaseModel):
    id: str