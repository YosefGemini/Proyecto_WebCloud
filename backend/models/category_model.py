from db.db import Base
from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, func, DateTime, Float
from sqlalchemy.orm import relationship, backref
from sqlalchemy.dialects.postgresql import UUID

class Category(Base):
    __tablename__ = "category"

    id = Column(UUID(as_uuid=True), primary_key=True, server_default= func.gen_random_uuid())
    name = Column(String(50), nullable=False)
    description = Column(String(1000), nullable=True)

    products = relationship("Product", secondary="categories_products", back_populates="categories")


