from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.schemas.guest import GuestCreate, GuestOut
from app.db.models.guest import Guest
from app.db.session import SessionLocal
from app.api.deps import get_db

router = APIRouter()

@router.post("/", response_model=GuestOut, status_code=status.HTTP_201_CREATED)
def create_guest(guest: GuestCreate, db: Session = Depends(get_db)):
    db_guest = Guest(**guest.dict())
    db.add(db_guest)
    db.commit()
    db.refresh(db_guest)
    return db_guest

@router.get("/", response_model=List[GuestOut])
def get_all_guests(db: Session = Depends(get_db)):
    return db.query(Guest).all()

@router.delete("/{guest_id}", status_code=204)
def delete_guest(guest_id: int, db: Session = Depends(get_db)):
    guest = db.query(Guest).get(guest_id)
    if not guest:
        return {"error": "Guest not found"}
    db.delete(guest)
    db.commit()
    return

@router.put("/{guest_id}", response_model=GuestOut)
def update_guest(guest_id: int, updated: GuestCreate, db: Session = Depends(get_db)):
    guest = db.query(Guest).get(guest_id)
    if not guest:
        raise HTTPException(status_code=404, detail="Guest not found")

    guest.name = updated.name
    guest.email = updated.email
    guest.is_attending = updated.is_attending

    db.commit()
    db.refresh(guest)
    return guest

