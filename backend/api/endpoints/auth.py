from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm

from schemas.user_schema import UserCreate, UserLogin, ChangePassword
from services.auth_service import register_user, login_user
from db.database import get_db
from api.deps import get_current_user
from core.security import hash_password, verify_password

router = APIRouter()


@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):

    new_user = register_user(
        db,
        user.email,
        user.username,
        user.password
    )

    return {"message": "User created", "id": new_user.id}


@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):

    token = login_user(
        db,
        form_data.username,   # username ở trường hợp này là email
        form_data.password
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }



@router.post("/change-password")
def change_password(
        data: ChangePassword,
        current_user=Depends(get_current_user),
        db: Session = Depends(get_db)
):

    if not verify_password(data.old_password, current_user.hashed_password):
        return {"error": "Old password incorrect"}

    current_user.hashed_password = hash_password(data.new_password)

    db.commit()

    return {"message": "Password updated"}