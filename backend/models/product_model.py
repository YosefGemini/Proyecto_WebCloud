

from db.db import Base
from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, func, DateTime, Float
from sqlalchemy.orm import relationship, backref
from sqlalchemy.dialects.postgresql import UUID
from models.file_model import File

class Product(Base):
    __tablename__ = "product"

    id = Column(UUID(as_uuid=True), primary_key=True, server_default= func.gen_random_uuid())
    name = Column(String(250), nullable=False)
    description = Column(String(1000), nullable=True)
    characteristics = Column(String(1000), nullable=True)
    price = Column(Float, nullable=False)
    discount = Column(Float, nullable=False, default=0.0)
    quantity = Column(Integer, nullable=True)

    #relationships

    categories = relationship("Category", secondary="categories_products", back_populates="products")
    files = relationship("File", back_populates="products")