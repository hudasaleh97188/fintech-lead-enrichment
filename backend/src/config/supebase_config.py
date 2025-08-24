from supabase import create_client, Client
from dotenv import load_dotenv
import os

def get_supabase_client() -> Client:
    """Initialize and return a Supabase client."""
    load_dotenv()
    url: str = os.environ.get("SUPABASE_URL")
    key: str = os.environ.get("SUPABASE_KEY")
    return create_client(url, key)