from sqlalchemy import Column, Integer, String, Boolean
from app.db.base import Base

class Guest(Base):
    __tablename__ = "guests"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    is_attending = Column(Boolean, default=False)
