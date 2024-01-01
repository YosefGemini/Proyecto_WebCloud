from db.db import Base
from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Table
from sqlalchemy.orm import relationship, backref
from sqlalchemy.dialects.postgresql import UUID

categories_products = Table('categories_products', Base.metadata,
                            Column('category_id', UUID(as_uuid=True), ForeignKey('category.id'), primary_key=True),
                            Column('product_id', UUID(as_uuid=True), ForeignKey('product.id'), primary_key=True)
)