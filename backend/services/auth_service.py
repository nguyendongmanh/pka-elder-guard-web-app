from sqlalchemy.orm import Session
from fastapi import HTTPException
from core.security import hash_password, verify_password, create_access_token
from crud.user_crud import get_user_by_email, create_user


def register_user(db: Session, email: str, username: str, password: str):

    existing_user = get_user_by_email(db, email)

    if existing_user:
        raise HTTPException(status_code=400, detail="Email already exists")

    hashed = hash_password(password)

    return create_user(db, email, username, hashed)


def login_user(db: Session, email: str, password: str):

    user = get_user_by_email(db, email)

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if not verify_password(password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Incorrect password")

    token = create_access_token({
        "sub": user.email,
        "user_id": user.id
    })

    return {
        "access_token": token,
        "user_id": user.id
    }
