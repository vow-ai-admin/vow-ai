from pydantic import BaseModel

class VowRequest(BaseModel):
    partner_name: str
    tone: str  # e.g., romantic, poetic, funny

class VowResponse(BaseModel):
    tone: str
    message: str
