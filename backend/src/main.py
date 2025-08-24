
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.api.routes.leads import router as leads_router
from src.api.routes.contacts import router as contacts_router
from src.config.logging_config import configure_logging

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

configure_logging()
app.include_router(leads_router, prefix="/api")
app.include_router(contacts_router, prefix="/api")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("src.main:app", host="0.0.0.0", port=8000, reload=True)
