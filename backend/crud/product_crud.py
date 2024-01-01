

from fastapi import HTTPException, status
from sqlalchemy.orm import Session, joinedload

from models import product_model,category_model
from schemas.product import ProductCreate, ProductUpdate, ProductDelete



def get_all_products(db: Session):
    products_in_db = db.query(product_model.Product).options(joinedload(product_model.Product.categories),joinedload(product_model.Product.files)).all()

    if not products_in_db:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Products not found")
    return products_in_db


def get_product_by_UUID(db: Session, product_id: str):
    product_in_db = db.query(product_model.Product).filter(product_model.Product.id == product_id).options(joinedload(product_model.Product.categories),joinedload(product_model.Product.files)).first()

    if not product_in_db:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Product with id {product_id} not found")
    return product_in_db


def create_product(db: Session, product: ProductCreate):
    product_in_db = db.query(product_model.Product).filter(product_model.Product.name == product.name).first()

    if product_in_db:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                            detail=f"Product with name {product.name} already exists")


    categories = []
    for category_id in product.categories:
        category_in_db = db.query(category_model.Category).filter(category_model.Category.id == category_id).first()
        if not category_in_db:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                                detail=f"Category with id {category_id} not found")
        categories.append(category_in_db)
    
    print(categories)
    db_product = product_model.Product(
        name=product.name,
        description=product.description,
        characteristics=product.characteristics,
        price=product.price,
        discount=product.discount ,
        quantity=product.quantity,
        categories=categories,

    )
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product


def update_product(db: Session, product: ProductUpdate):
    product_in_db = db.query(product_model.Product).filter(product_model.Product.id == product.id).first()

    if not product_in_db:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Product with id {product.id} not found")

    product_in_db.name = product.name
    product_in_db.description = product.description
    product_in_db.characteristics = product.characteristics


    db.commit()
    db.refresh(product_in_db)

    return product_in_db
 

def delete_product(db: Session, product: ProductDelete):
    product_in_db = db.query(product_model.Product).filter(product_model.Product.id == product.id).first()

    if not product_in_db:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Product with id {product.id} not found")
    
    db.delete(product_in_db)
    db.commit()
    return product_in_db
