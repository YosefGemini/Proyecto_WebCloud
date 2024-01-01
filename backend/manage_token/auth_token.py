import jwt

from datetime import datetime, timedelta

from conf import settings
#from exceptions import AuthTokenMissing, AuthTokenExpired, AuthTokenCorrupted




SECRET_KEY = 'e0e5f53b239df3dc39517c34ae0a1c09d1f5d181dfac1578d379a4a5ee3e0ef5'
ALGORITHM = 'HS256'


def generate_access_token(
        data: dict,
        expires_delta: timedelta = timedelta(
            minutes=settings.ACCESS_TOKEN_DEFAULT_EXPIRE_MINUTES
        )
):

    expire = datetime.utcnow() + expires_delta
    token_data = {
        **data,
        'exp': expire,
    }

    encoded_jwt = jwt.encode(token_data, SECRET_KEY, algorithm=ALGORITHM)

    #r.sadd('access_tokens', encoded_jwt)

    return encoded_jwt

def decode_access_token(authorization: str = None):
    try:
        return jwt.decode(authorization, SECRET_KEY, algorithms=ALGORITHM)
    except Exception as e:
        print(e)
        return None

    
    
