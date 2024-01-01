

from db.db import Base
from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, func, DateTime, Float
from sqlalchemy.orm import relationship, backref
from sqlalchemy.dialects.postgresql import UUID

class Product(Base):
    __tablename__ = "product"

    id = Column(UUID(as_uuid=True), primary_key=True, server_default= func.gen_random_uuid())
    name = Column(String(250), nullable=False)
    description = Column(String(1000), nullable=True)
    characteristics = Column(String(1000), nullable=True)

    categories = relationship("Category", secondary="categories_products", back_populates="products")