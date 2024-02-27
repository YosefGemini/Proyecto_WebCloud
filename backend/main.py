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
from botocore.exceptions import NoCredentialsError
import boto3
from models import file_model, product_model, category_model
from schemas.file import FileCreate, FileUpdate, FileDelete, File_DB
from schemas.category import CategoryCreate, CategoryUpdate, CategoryDelete, Category
from schemas.product import ProductCreate, ProductUpdate, ProductDelete, Product
from crud import file_crud,category_crud,product_crud


s3_client = boto3.client('s3')
#s3_bucket_name = 'grupo6.jose'
AWS_REGION = 'us-east-1'
S3_BUCKET_NAME = 'josejimenezbucket'

#s3 = boto3.client('s3', region_name=AWS_REGION)


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
    
async def upload_file_to_s3(file: UploadFile, product_id: str):
    try:
        base_name, extension = os.path.splitext(file.filename)
        number = 1
        s3_file_name = file.filename
        print('step 1')
        s3_res = boto3.resource('s3')
        bucket = s3_res.Bucket(S3_BUCKET_NAME)
        # boto3.resource("s3").Bucket(S3_BUCKET_NAME).wait_until_exists()

        # if s3.Bucket(S3_BUCKET_NAME).exists():
        #     print("El bucket existe")
        # else:
        #     print("El bucket no existe")

        #while s3.file_name_exists(S3_BUCKET_NAME, s3_file_name):
        s3_file_name = f"{base_name}_{number}{extension}"
        number += 1

        path_to_save = f"uploads/files/Product_{product_id}/{s3_file_name}"
        print('step 2',path_to_save)
        upload_to_s3(path_to_save, file.file)
        # bucket.upload_fileobj(file.file, path_to_save)
        print('step 3')

        return path_to_save

    except NoCredentialsError:
        raise HTTPException(status_code=500, detail="No se han encontrado las credenciales de AWS.")


# endpoint para bucket s3
    
def upload_to_s3(file_path: str, file_content: UploadFile):
    try:
        s3_client.put_object(Body=file_content, Bucket=S3_BUCKET_NAME, Key=file_path)
    except Exception as e:
        # Maneja errores de subida a S3 según tus necesidades
        print(f"Error uploading file to S3: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail="Error uploading file to S3")
    
@app.post("/api/files/s3", response_model=list[File_DB])
async def upload_fileS3_endpoint(
    db: Session = Depends(get_db),
    files: list[UploadFile] = File(...),
    product_id: str = Form(...),
):

    try:
        files_schemas = []

        for file in files:
            s3_path = await upload_file_to_s3(file, product_id)

            file_schema = FileCreate(
                name=file.filename,
                path=s3_path,
                product_id=product_id
            )

            files_schemas.append(file_schema)

        return file_crud.create_files(db=db, files=files_schemas)

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# descargar desde S3
#def s3_download_file(key: str):
#    try:
#        return s3.

@app.get("/api/files/s3/{file_id}")
async def download_file(file_id: str, db: Session = Depends(get_db),):
    # Buscar el archivo en la base de datos
    file = file_crud.get_file(db=db, file_id=file_id)
    print("file: ", file.path)
    print
    if file is None:
        raise HTTPException(status_code=404, detail="File not found in DB")
    res_file = s3_client.head_object(Bucket=S3_BUCKET_NAME, Key=file.path)
    print("respuesta de comprobacion:", res_file)

    if not res_file:
        raise HTTPException(status_code=404, detail="File not found in S3")
    #config = botocore.client.Config(signature_version=botocore.UNSIGNED)
    s3 = boto3.resource('s3')
    #s3.Object()
    #s3client = boto3.client('s3', config=config)
    #url = s3client.generate_presigned_url('get_object', {'Bucket':S3_BUCKET_NAME, 'Key': file.path})
    file_blob= s3.Object(bucket_name=S3_BUCKET_NAME, key=file.path).get()['Body'].read()
    #print("\n File info: \n", file_info.content_type, file_info.last_modified)
    print("filename :",file.name, "file path :",file.path)
    #file = s3.Object.get(file.path)
    #fileout= s3.Bucket(S3_BUCKET_NAME).download_file(file.path, file.name)
    #print("Fase final", fileout)
    #final_path = "https://app-store-storage.s3.us-east-2.amazonaws.com/" + file.path
    print("finalPath: ", file)
    # Devolver la URL del archivo en S3 para que el usuario pueda descargarlo
    #return FileResponse(file_blob)
    #return Response(
    #    content=file_blob,
    #    headers={
    #        'Content-Disposition': f'inline;filename={file.name}',
    #        'Content-Type': 'application/octet-stream',
    #    }
    #
    #)
    return Response(
        content=file_blob,
        headers={
            "Content-Type": "image/jpeg",  # Ajusta el tipo de contenido según el formato de la imagen
            "Content-Disposition": "inline",
        },
    )
    #return file


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
