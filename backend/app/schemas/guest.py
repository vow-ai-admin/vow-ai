from pydantic import BaseModel, EmailStr

class GuestCreate(BaseModel):
    name: str
    email: EmailStr
    is_attending: bool

class GuestOut(GuestCreate):
    id: int

    class Config:
        from_attributes = True
