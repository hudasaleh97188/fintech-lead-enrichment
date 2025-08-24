create table if not exists leads_table (
    -- Auto-generated primary key
    id bigserial primary key,

    -- Lead/Contact details
    first_name text not null,
    last_name text not null,
    email text ,
    contact_number text,
    city text,
    country text,
    company text not null,
    interested_in text,
    inquiry text,
    created_date timestamptz default now(),

    -- Enrichment status and timestamps
    enrichment_status text default 'pending',
    enriched_at timestamptz,
    enrichment_flag boolean default false,

    -- Company fields
    company_name text ,
    company_website text,
    company_industry text,
    company_employee_count int,
    company_annual_revenue numeric,
    company_headquarters text,
    company_founded_year int,
    company_technologies text[] default '{}',
    company_funding_details text,
    company_hiring_trends text[] default '{}',
    company_recent_news text[] default '{}',
    company_twitter_url text,
    company_facebook_url text,

    -- Person fields
    person_full_name text ,
    person_job_title text,
    person_seniority_level text,
    person_department text,
    person_location text,
    person_work_history text[] default '{}',
    person_skills text[] default '{}'
);

