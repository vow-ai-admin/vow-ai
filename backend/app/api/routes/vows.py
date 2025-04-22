from fastapi import APIRouter
from app.schemas.vows import VowRequest, VowResponse

router = APIRouter()

@router.post("/", response_model=VowResponse)
def generate_vows(vow_request: VowRequest):
    # Placeholder logic
    return VowResponse(
        tone=vow_request.tone,
        message=f"Dear {vow_request.partner_name}, I vow to always love you with {vow_request.tone} passion."
    )
