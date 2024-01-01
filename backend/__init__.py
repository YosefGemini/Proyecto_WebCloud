from db.db import Base
from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship, backref
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import func, DateTime



class Movie():
    __tablename__ = "movies"
    id = Column(UUID(as_uuid=True), primary_key=True, server_default=func.gen_random_uuid())
    title = Column(String(50) , nullable=False)
    year = Column(Integer , nullable=True)
    description = Column(String(1000) , nullable=True)
    genre = Column(String(50) , nullable=False)
    poster = Column(String(200) , nullable=False)
    movieURL = Column(String(200) , nullable=False)


