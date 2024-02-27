from fastapi import HTTPException, status
from sqlalchemy.orm import Session, joinedload
from uuid import UUID
from schemas.file import FileCreate, FileUpdate, FileDelete
from models import file_model, product_model


# No necesitas configurar las credenciales manualmente

# Crea un cliente de S3 (o cualquier otro servicio de AWS)


def create_files(db: Session, files: list[FileCreate]):


    response_files = []

    for file in files:
        file_in_db = db.query(file_model.File).filter(file_model.File.path == file.path).first()
        if file_in_db:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                                detail=f"File with path {file.path} already exists")
        product_in_db = db.query(product_model.Product).get(file.product_id)
        if not product_in_db:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                                detail=f"Product with id {file.product_id} not found")
        
        db_file = file_model.File(
            name=file.name,
            path=file.path,
            product_id=file.product_id
        )
        db.add(db_file)
        db.commit()
        db.refresh(db_file)
        # por cada iteracion guarda el archivo en la lista
        response_files.append(db_file)

    return response_files


# def create_files(db: Session, files: list[FileCreate]):
#     response_files = []

#     for file in files:
#         file_in_db = db.query(file_model.File).filter(file_model.File.path == file.path).first()
#         if file_in_db:
#             raise HTTPException(status_code=status.HTTP_409_CONFLICT,
#                                 detail=f"File with path {file.path} already exists")

#         product_in_db = db.query(product_model.Product).get(file.product_id)
#         if not product_in_db:
#             raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
#                                 detail=f"Product with id {file.product_id} not found")

#         db_file = file_model.File(
#             name=file.name,
#             path=file.path,
#             product_id=file.product_id
#         )
#         db.add(db_file)
#         db.commit()
#         db.refresh(db_file)
#         response_files.append(db_file)

#         # Subir el archivo al bucket S3
#         upload_to_s3(file.path, file.content)

#     return response_files



def get_product_files(db: Session, product_id: UUID):

    files = db.query(file_model.File).filter(file_model.File.product_id == product_id).all()
    
    if not files:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Product with id {product_id} not found")
    return files



def get_file(db: Session, file_id: UUID):
    file_in_db = db.query(file_model.File).filter(file_model.File.id == file_id).first()

    if not file_in_db:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"File with id {file_id} not found")
    return file_in_db
        
     
    
    