

from fastapi import HTTPException, status
from sqlalchemy.orm import Session, joinedload

from models import product_model, category_model
from schemas.product import ProductBase, ProductCreate, ProductUpdate, ProductDelete, Product
from manage_token import auth_token
from manage_password.auth import get_password_hash
from manage_password.auth import verify_password



def get_all_products(db: Session, ):
    products_in_db = db.query(product_model.Product).all()

    if not products_in_db:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Products not found")
    return products_in_db


def get_product_by_UUID(db: Session, product_id: str):
    product_in_db = db.query(product_model.Product).filter(product_model.Product.id == product_id).first()

    if not product_in_db:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Product with id {product_id} not found")
    return product_in_db


def create_product(db: Session, product: ProductCreate):
    product_in_db = db.query(product_model.Product).filter(product_model.Product.name == product.name).first()

    if product_in_db:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                            detail=f"Product with name {product.name} already exists")


    db_product = product_model.Product(
        name=product.name,
        description=product.description,
        characteristics=product.characteristics,
    )
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product
 