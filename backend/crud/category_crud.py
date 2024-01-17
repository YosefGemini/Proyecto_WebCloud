
from fastapi import HTTPException, status
from sqlalchemy.orm import Session, joinedload

from models import category_model
from schemas.category import CategoryCreate, CategoryUpdate, CategoryDelete


def get_all_categories(db: Session):
    categories_in_db = db.query(category_model.Category).options(joinedload(category_model.Category.products)).all()

    if not categories_in_db:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Categories not found")
    return categories_in_db

def get_category_by_UUID(db: Session, category_id: str):
    category_in_db = db.query(category_model.Category).filter(category_model.Category.id == category_id).options(joinedload(category_model.Category.products)).first()

    if not category_in_db:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Category with id {category_id} not found")
    return category_in_db

def create_category(db: Session, category: CategoryCreate):
    category_in_db = db.query(category_model.Category).filter(category_model.Category.name == category.name).first()

    if category_in_db:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                            detail=f"Category with name {category.name} already exists")


    db_category = category_model.Category(
        name=category.name,
        description=category.description,
    )
    db.add(db_category)
    db.commit()
    db.refresh(db_category)

    return db_category

def update_category(db: Session, category: CategoryUpdate):
    category_in_db = db.query(category_model.Category).filter(category_model.Category.id == category.id).first()

    if not category_in_db:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Category with id {category.id} not found")

    category_in_db.name = category.name
    category_in_db.description = category.description

    db.commit()
    db.refresh(category_in_db)

    return category_in_db

def delete_category(db: Session, category: CategoryDelete):
    category_in_db = db.query(category_model.Category).filter(category_model.Category.id == category.id).first()

    if not category_in_db:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Category with id {category.id} not found")

    db.delete(category_in_db)
    db.commit()
    return category_in_db


