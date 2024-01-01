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
