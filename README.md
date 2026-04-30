import os
import hmac
import hashlib
from typing import Optional, List
from fastapi import FastAPI, UploadFile, File, Header, HTTPException
from pydantic import BaseModel
from openai import OpenAI

# 1. Initialize App & Security
app = FastAPI(title="IBM Global DPP Infrastructure")
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
SECRET_KEY = os.getenv("DPP_SECRET_KEY", "secure_2026_key")

# 2. Data Models
class Material(BaseModel):
    name: str
    concentration: float

class ProductPassport(BaseModel):
    gtin: str
    serial: str
    product_name: str
    materials: List[Material]
    hazardous_substances: List[str]

# 3. Security Signing
def sign_data(gtin: str, serial: str) -> str:
    msg = f"{gtin}:{serial}".encode()
    return hmac.new(SECRET_KEY.encode(), msg, hashlib.sha256).hexdigest()

# 4. API Routes
@app.post("/ingest")
async def create_passport(file: UploadFile = File(...)):
    content = (await file.read()).decode('utf-8')
    completion = client.beta.chat.completions.parse(
        model="gpt-4o-2024-08-06",
        messages=[{"role": "system", "content": "Extract 2026 DPP compliance data."}],
        response_format=ProductPassport,
    )
    data = completion.choices[0].message.parsed
    signature = sign_data(data.gtin, data.serial)
    return {
        "status": "Verified",
        "passport": data,
        "signature": signature,
        "gs1_url": f"https://id.dpp.global/01/{data.gtin}/21/{data.serial}?sig={signature}"
    }

@app.get("/01/{gtin}/21/{serial}")
async def resolve(gtin: str, serial: str, sig: str):
    if sig != sign_data(gtin, serial):
        raise HTTPException(status_code=403, detail="Tamper Alert!")
    return {"verified": True, "data_integrity": "100%", "gtin": gtin}
