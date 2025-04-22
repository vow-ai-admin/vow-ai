from fastapi import APIRouter
from .vows import router as vows_router
from .guests import router as guest_router

router = APIRouter()
router.include_router(vows_router, prefix="/vows", tags=["Vows"])
router.include_router(guest_router, prefix="/guests", tags=["Guests"])
