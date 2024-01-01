from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# SQLALCHEMY_DATABASE_URL = "postgresql://root:root@172.19.10.55:5432/test_db"
SQLALCHEMY_DATABASE_URL = "postgresql://josejim:root@172.18.0.2:5432/tech_Store"
# SQLALCHEMY_DATABASE_URL = "postgresql://root:root@172.19.10.55:5432/pqr_vision_fund"
# SQLALCHEMY_DATABASE_URL = "postgresql://user:admin@172.18.0.1:54320/pqr_lucha"
# SQLALCHEMY_DATABASE_URL = (
#     "postgresql://root:root@192.100.100.23:5432/pqrs_lucha_campesina"
# )


# SQLALCHEMY_DATABASE_URL = "postgresql://user:admin@172.19.10.113:54320/pqrs"
# SQLALCHEMY_DATABASE_URL = "postgresql://root:root@localhost:5432/pqrs"

engine = create_engine(SQLALCHEMY_DATABASE_URL, echo=False)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
