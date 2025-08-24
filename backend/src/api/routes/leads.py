from fastapi import APIRouter
from src.schemas.lead import EnrichedLead
from src.utils.lead_enrichment import LeadEnrichmentProcessor, update_lead_in_supabase
from src.config.supebase_config import get_supabase_client
from src.config.langfuse_config import init_langfuse

router = APIRouter()
init_langfuse()

@router.post("/enrich-lead")
async def enrich_lead(lead: EnrichedLead):
    processor = LeadEnrichmentProcessor()
    enriched_data = await processor.enrich_single_lead(lead.company_name, lead.person_name)
    supabase = get_supabase_client()
    update_lead_in_supabase(supabase, lead.lead_id, enriched_data)
    return enriched_data