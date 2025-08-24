
"""
Lead Scoring Supabase Integration System

This module integrates Supabase data processing with the Google ADK lead scoring agent.
It reads leads from a Supabase table, processes them through the agent, and saves the results back to the table.
"""
import asyncio
import uuid
from typing import Any, Dict, List
import pandas as pd
from google.adk.runners import Runner
from google.adk.sessions import InMemorySessionService
from google.genai import types
from src.agents.lead_enrich.agent import root_agent
from src.config.supebase_config import get_supabase_client
from src.config.logging_config import logger
from supabase import  Client


class LeadEnrichmentProcessor:
    """Main class for enriching leads from Supabase through Google ADK agents."""

    def __init__(self):
        """Initialize the lead enrichment processor."""
        self.session_service = InMemorySessionService()
        self.app_name = "Lead Enrichment"
        self.user_id = "supabase_processor"
        self.runner = Runner(
            agent=root_agent,
            app_name=self.app_name,
            session_service=self.session_service,
        )

    async def enrich_single_lead(self, company_name: str, person_name: str) -> Dict[str, Any]:
        """
        Enrich a single lead through the Google ADK agent pipeline.

        Args:
            company_name: Name of the company.
            person_name: Name of the person.

        Returns:
            A dictionary containing the enriched lead data.
        """
        session_id = str(uuid.uuid4())
        logger.info(f"Processing lead: {company_name} - {person_name}")

        try:
            initial_state = {"company_name": company_name, "person_name": person_name}
            await self.session_service.create_session(
                app_name=self.app_name,
                session_id=session_id,
                user_id=self.user_id,
                state=initial_state,
            )
            async for event in self.runner.run_async(
                user_id=self.user_id,
                session_id=session_id,
                new_message=types.Content(
                    role="user", parts=[types.Part(text="Process this lead")]
                ),
            ):
                if event.is_final_response():
                    pass
            final_session = await self.session_service.get_session(
                app_name=self.app_name, user_id=self.user_id, session_id=session_id
            )
            enriched_data = final_session.state.get("Lead_enriched", {})
            return enriched_data
        except Exception as e:
            logger.error(f"Error enriching lead {company_name}: {e}")
            return {
                "company_name": company_name,
                "person_name": person_name,
                "enrichment_status": "Error",
                "error_details": str(e),
            }

    async def process_leads_from_supabase(self) -> None:
        """Orchestrates the reading, processing, and saving of leads from/to Supabase."""
        supabase = get_supabase_client()
        leads_to_process = read_leads_from_supabase(supabase)
        if not leads_to_process:
            return
        for lead in leads_to_process:
            company_name = lead.get("company", "")
            person_name = f'{lead.get("first_name", "")} {lead.get("last_name", "")}'
            result = await self.enrich_single_lead(
                company_name=company_name, person_name=person_name
            )
            update_lead_in_supabase(supabase, lead['id'], result)

def read_leads_from_supabase(supabase: Client) -> List[Dict[str, Any]]:
    """Reads unenriched leads from the Supabase 'leads_table'."""
    try:
        response = supabase.table('leads_table').select('*').eq('enrichment_flag', 'false').execute()
        return response.data
    except Exception as e:
        logger.error(f"Error reading from Supabase: {e}")
        return []

def update_lead_in_supabase(supabase: Client, lead_id: int, enriched_data: Dict[str, Any]):
    """Updates a lead in the Supabase 'leads_table' with enriched data."""
    try:
        update_data = enriched_data
        update_data['enrichment_status'] = 'Success'
        update_data['enrichment_flag'] = True
        update_data['enriched_at'] = pd.to_datetime('now').isoformat()
        for key in ["company_technologies", "company_hiring_trends", "company_recent_news", "person_work_history", "person_skills"]:
            if key in update_data and isinstance(update_data[key], list):
                update_data[key] = update_data[key]
        supabase.table('leads_table').update(update_data).eq('id', lead_id).execute()
        logger.info(f"Successfully updated lead {lead_id} in Supabase.")
    except Exception as e:
        logger.error(f"Error updating lead {lead_id} in Supabase: {e}")

async def main():
    """Main function to run the lead enrichment process."""
    processor = LeadEnrichmentProcessor()
    await processor.process_leads_from_supabase()

if __name__ == "__main__":
    asyncio.run(main())
