from fastapi import (
    FastAPI,
    Request,
    Response,
    Header,
    Depends,
    HTTPException,
    Form,
    File,
    Body,
    status,
    UploadFile,
)
from sqlalchemy.orm import Session
from db.db import engine, get_db, Base
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
#from models import user_model, album_model, photos_model, gender_model, comment_model, friend_model, reaction_model, reaction_type_model
import os
from os import path

from enum import Enum
from fastapi.middleware.cors import CORSMiddleware

#from schemas.user import UserPublic, UserCreate, UserUpdate, UserDelete, UserToken, UserCredentials, UserFriends, User
#from schemas.album import Album, AlbumCreate, AlbumUpdate, AlbumDelete
#from schemas.photo import Photo, PhotoCreate, PhotoUpdate, PhotoDelete
#from schemas.gender import Gender
#from schemas.friend import Friend, FriendCreate, FriendUpdate, FriendDelete
#from schemas.comment import Comment, CommentCreate, CommentUpdate, CommentDelete

#from crud import user_crud, album_crud, photo_crud, comment_crud, reaction_crud

#from manage_token import auth_token

from models import file_model, product_model, category_model
from schemas.file import FileCreate, FileUpdate, FileDelete, File_DB
from schemas.category import CategoryCreate, CategoryUpdate, CategoryDelete, Category
from schemas.product import ProductCreate, ProductUpdate, ProductDelete, Product
from crud import file_crud,category_crud,product_crud
Base.metadata.create_all(bind=engine)

app = FastAPI()

pathname = os.path.dirname(path.realpath(__file__))




# Endpoints

## Middlewares
# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.get("/")
def get_main():
    return {"Hello": "Danny <3"}


# Files endpoints

# Creado y guarda un archivo en la carpeta uploads/files

@app.post("/api/files" , response_model=list[File_DB])
async def upload_file_endpoint(
    db: Session = Depends(get_db),
    files: list[UploadFile] = File(...),
    product_id: str = Form(...)):

    try:
        files_schemas = []
        for file in files:
            # contents es un objeto de tipo bytes que contiene el contenido del archivo
            contents = await file.read()
            # la funcion os.path.splitext(path) devuelve una tupla con el nombre del archivo y su extension
            base_name, extension = os.path.splitext(file.filename)

            print(f"base_name: {base_name}")
            print(f"extension: {extension}")
            number = 1
            # la funcion os.path.join(path1, path2, ...) une los paths en un solo path
            pathToSave = path.join(pathname, "uploads", "files", f"Product_{product_id}", file.filename)



            # la funcion os.path.exists(path) devuelve True si el path existe, y False si no existe
            while os.path.exists(pathToSave):
                file.fllename = f"{base_name}_{number}{extension}"
                number += 1
                pathToSave = path.join(pathname, "uploads", "files", f"Product_{product_id}", file.filename)

            # la funcion os.makedirs(path) crea un directorio en el path especificado
            
            if not path.exists(os.path.dirname(pathToSave)):
                os.makedirs(os.path.dirname(pathToSave))
            
            with open(pathToSave, "wb") as buffer:

                print("Creando archivo",f"file.filename: {file.filename}")
                # la funcion buffer.write(bytes) escribe los bytes en el archivo
                buffer.write(contents)
                print("Archivo creado")
                # la funcion buffer.close() cierra el archivo
                buffer.close()


            file_schema = FileCreate(
                name=file.filename,
                path=pathToSave,
                product_id=product_id
            )

            print("file_schema",file_schema)

            files_schemas.append(file_schema)

        return file_crud.create_files(db=db, files=files_schemas)
            


    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail=str(e))

# Descarga archivo
    
@app.get("/api/files/{file_id}")
async def download_file_endpoint(
    file_id: str,
    db: Session = Depends(get_db),
    ):

    
    file = file_crud.get_file(db=db, file_id=file_id)
    print("file",file)

    if not os.path.exists(file.path):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"File with id {file_id} not found")
    # FileResponse(path) devuelve un archivo de tipo response con el archivo en el path especificado
    
    return FileResponse(file.path)


@app.get("/api/files/product/{product_id}")
async def get_product_files_endpoint(
    product_id: str,
    db: Session = Depends(get_db)):

    files = file_crud.get_product_files(db=db, product_id=product_id)

    response_files = []

    for file in files:
        if not os.path.exists(file.path):
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                                detail=f"File not found")
        
        response_files.append(FileResponse(file.path))

    return response_files


# Categories endpoints

# Get all categories

@app.get("/api/categories" , response_model=list[Category])
async def get_all_categories_endpoint(
    db: Session = Depends(get_db)):
    return category_crud.get_all_categories(db=db)


# Get category by UUID
@app.get("/api/categories/{category_id}")
async def get_category_endpoint(
    category_id: str,
    db: Session = Depends(get_db)):
    return category_crud.get_category_by_UUID(db=db, category_id=category_id)


# Create category
@app.post("/api/categories", response_model=Category)
async def create_category_endpoint(
    category: CategoryCreate,
    db: Session = Depends(get_db)):
    return category_crud.create_category(db=db, category=category)


# Update category

@app.put("/api/categories", response_model=Category)
async def update_category_endpoint(
    category: CategoryUpdate,
    db: Session = Depends(get_db)):
    return category_crud.update_category(db=db, category=category)

# Delete category

@app.delete("/api/categories", response_model=Category)
async def delete_category_endpoint(
    category: CategoryDelete,
    db: Session = Depends(get_db)):
    return category_crud.delete_category(db=db, category=category)

# Products endpoints
# Get all products

@app.get("/api/products", response_model=list[Product])
async def get_all_products_endpoint(
    db: Session = Depends(get_db)):
    return product_crud.get_all_products(db=db)

# Get product by UUID
@app.get("/api/products/{product_id}", response_model=Product)
async def get_product_endpoint(
    product_id: str,
    db: Session = Depends(get_db)):
    return product_crud.get_product_by_UUID(db=db, product_id=product_id)

# Create product
@app.post("/api/products", response_model=Product)
async def create_product_endpoint(
    product: ProductCreate,
    db: Session = Depends(get_db)):
    return product_crud.create_product(db=db, product=product)

# Update product
@app.put("/api/products", response_model=Product)
async def update_product_endpoint(
    product: ProductUpdate,
    db: Session = Depends(get_db)):
    return product_crud.update_product(db=db, product=product)

# Delete product
@app.delete("/api/products", response_model=Product)
async def delete_product_endpoint(
    product: ProductDelete,
    db: Session = Depends(get_db)):
    return product_crud.delete_product(db=db, product=product)
