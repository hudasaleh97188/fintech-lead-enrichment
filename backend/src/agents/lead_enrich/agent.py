from google.adk.agents import ParallelAgent, SequentialAgent
from src.agents.lead_enrich.subagents.company_research_agent import company_research_agent
from src.agents.lead_enrich.subagents.person_research_agent import person_research_agent
from src.agents.lead_enrich.subagents.structuring_agent import structuring_agent
from google.adk.agents.callback_context import CallbackContext 
import logging

        
def set_lead_info(callback_context: CallbackContext):
    """Callback to set company and person information from state"""
    company_name = callback_context.state.get("company_name", "")
    person_name = callback_context.state.get("person_name", "")
    
    logging.info(f"Processing: {company_name} - {person_name}")
    
    # Set the information that will be used by sub-agents
    callback_context.state["company_name"] = company_name
    callback_context.state["person_name"] = person_name
    return None  # proceed normally
        

    
# --- 1. Create Parallel Agent to gather information concurrently ---
lead_info_gatherer = ParallelAgent(
    name="lead_info_gatherer",
    sub_agents=[company_research_agent, person_research_agent],
    before_agent_callback= set_lead_info
)

# --- 2. Create Sequential Pipeline to gather info in parallel, then synthesize ---
root_agent = SequentialAgent(
    name="lead_scoring_agent",
    sub_agents=[lead_info_gatherer, structuring_agent],
)

