import logging

logger = logging.getLogger(__name__)

def configure_logging():
    """Configure logging for the application."""
    logging.basicConfig(
        level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s"
    )