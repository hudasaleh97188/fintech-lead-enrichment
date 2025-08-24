from pydantic import BaseModel, Field
from typing import List, Optional

class Lead(BaseModel):
    lead_id: int
    company_name: str
    person_name: str

class Contact(BaseModel):
    firstName: str
    lastName: str
    email: str
    contactNumber: str
    city: str
    country: str
    company: str
    interestedIn: List[str]
    inquiry: str

class EnrichedLead(BaseModel):
    lead_id: int = Field(..., description="The unique ID of the lead in the Supabase leads_table")
    company_name: str = Field(..., description="The official name of the company associated with the lead")
    person_name: str = Field(..., description="Full name of the lead/contact person")


class DataEnrichment(BaseModel):
    company_name: str = Field(..., description="The official name of the company associated with the lead")
    company_website: Optional[str] = Field(None, description="The company's primary website URL (e.g., https://example.com)")
    company_industry: Optional[str] = Field(None, description="The industry sector of the company (e.g., 'Technology', 'Finance')")
    company_employee_count: Optional[int] = Field(None, ge=0, description="Number of employees in the company (positive integer or zero)")
    company_annual_revenue: Optional[float] = Field(None, description="Estimated annual revenue of the company in USD (e.g., 1000000.50)")
    company_headquarters: Optional[str] = Field(None, description="Headquarters location (e.g., 'San Francisco, CA, USA')")
    company_founded_year: Optional[int] = Field(None, description="Year the company was founded")
    company_technologies: List[str] = Field(default_factory=list, description="List of technologies used by the company (e.g., ['Python', 'AWS'])")
    company_funding_details: Optional[str] = Field(None, description="Funding details of the company")
    company_hiring_trends: List[str] = Field(default_factory=list, description="Recent hiring trends or roles posted (e.g., ['Hiring AI engineers'])")
    company_recent_news: List[str] = Field(default_factory=list, description="Recent news or updates about the company (e.g., ['Launched product X'])")
    person_full_name: str = Field(..., description="Full name of the lead/contact person")
    person_job_title: Optional[str] = Field(None, description="Current job title of the person (e.g., 'CTO')")
    person_seniority_level: Optional[str] = Field(None, description="Seniority level of the person (e.g., 'C-Level', 'Mid-Level')")
    person_department: Optional[str] = Field(None, description="Department the person works in (e.g., 'Engineering', 'Sales')")
    person_location: Optional[str] = Field(None, description="Geographic location of the person (e.g., 'New York, NY, USA')")
    person_work_history: List[str] = Field(default_factory=list, description="Previous companies or roles of the person (e.g., ['Engineer at ABC Corp'])")
    person_skills: List[str] = Field(default_factory=list, description="Skills or expertise of the person (e.g., ['Python', 'Leadership'])")