import os
from supabase import create_client, Client
from dotenv import load_dotenv
from typing import List
from src.schemas.lead import Contact
from src.config.logging_config import logger
from fastapi import HTTPException, APIRouter

load_dotenv()

router = APIRouter()

# Initialize Supabase client
url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)

@router.post("/save-contact")
async def save_contact(contact: Contact):
    try:
        data_to_insert = {
            "first_name": contact.firstName,
            "last_name": contact.lastName,
            "email": contact.email,
            "contact_number": contact.contactNumber,
            "city": contact.city,
            "country": contact.country,
            "company": contact.company,
            "interested_in": ", ".join(contact.interestedIn),
            "inquiry": contact.inquiry,
            "enrichment_flag": False
        }
        response = supabase.table('leads_table').insert([data_to_insert]).execute()
        inserted_id = response.data[0]['id']  # Extract the auto-generated ID
        logger.info(f"Saved contact: {contact.email}, ID: {inserted_id}")
        return {"message": "Contact saved successfully", "lead_id": inserted_id}
    except Exception as e:
        logger.error(f"Error saving contact: {e}")
        raise HTTPException(status_code=500, detail=str(e))