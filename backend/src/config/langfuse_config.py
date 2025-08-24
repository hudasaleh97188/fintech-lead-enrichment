# src/config/langfuse.py
import os
import base64
from dotenv import load_dotenv
from langfuse import get_client

# Load environment variables from .env
load_dotenv()

def init_langfuse():
    """Initialize and authenticate the Langfuse client with OpenTelemetry setup."""
    public_key = os.getenv("LANGFUSE_PUBLIC_KEY")
    secret_key = os.getenv("LANGFUSE_SECRET_KEY")
    host = os.getenv("LANGFUSE_HOST", "https://cloud.langfuse.com")

    if not public_key or not secret_key:
        raise ValueError("❌ Missing LANGFUSE_PUBLIC_KEY or LANGFUSE_SECRET_KEY in .env")

    # Build Basic Auth header for OpenTelemetry
    auth_header = base64.b64encode(f"{public_key}:{secret_key}".encode()).decode()

    # Configure OpenTelemetry environment
    os.environ["OTEL_EXPORTER_OTLP_ENDPOINT"] = f"{host}/api/public/otel"
    os.environ["OTEL_EXPORTER_OTLP_HEADERS"] = f"Authorization=Basic {auth_header}"

    # Initialize Langfuse client
    langfuse = get_client()

    # Verify connection
    if langfuse.auth_check():
        print("Langfuse client authenticated successfully")
    else:
        print("Langfuse authentication failed. Check your credentials.")

    return langfuse


def update_trace(
    langfuse,
    input_data,
    output_data,
    user_id,
    session_id,
    tags=None,
    metadata=None,
    version="1.0.0"
):
    """Update Langfuse trace with structured metadata."""
    langfuse.update_current_trace(
        input=input_data,
        output=output_data,
        user_id=user_id,
        session_id=session_id,
        tags=tags or ["agent"],
        metadata=metadata or {},
        version=version
    )
