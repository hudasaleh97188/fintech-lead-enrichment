# Pulse Fintech

Pulse Fintech is a full-stack web application designed to capture and enrich leads for financial technology solutions. The frontend, built with React and TypeScript, provides a user-friendly contact form, while the backend, powered by FastAPI and Python, saves leads to a Supabase database and enriches them using AI-driven research agents. The app is ideal for businesses seeking to collect and analyze lead data efficiently.

## Table of Contents
- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Testing the Application](#testing-the-application)
- [Environment Variables](#environment-variables)
- [Supabase Setup](#supabase-setup)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## Features
- **Contact Form**: Users can submit inquiries via a form at `http://localhost:8080`, capturing details like name, email, company, and interests.
- **Lead Storage**: Saves form submissions to a Supabase database (`leads_table`).
- **Lead Enrichment**: Automatically enriches leads with company and person data using Google ADK agents.
- **Responsive Frontend**: Built with React, TypeScript, and Tailwind CSS for a modern UI.
- **FastAPI Backend**: Handles API requests efficiently with endpoints `/api/save-contact` and `/api/enrich-lead`.
- **CORS Support**: Configured to allow frontend-backend communication (frontend on `8080`, backend on `8000`).

## Project Structure
```
pulse-fintech/
├── backend/
│   ├── src/
│   │   ├── api/
│   │   │   ├── routes/
│   │   │   │   ├── contacts.py       # Handles /api/save-contact
│   │   │   │   ├── leads.py          # Handles /api/enrich-lead
│   │   ├── agents/
│   │   │   ├── lead_enrich/
│   │   │   │   ├── company_research_agent.py  # Company data research
│   │   │   │   ├── person_research_agent.py   # Person data research
│   │   │   │   ├── structuring_agent.py      # Structures data
│   │   ├── schemas/
│   │   │   ├── lead.py              # Pydantic models (Contact, Lead, EnrichedLead, DataEnrichment)
│   │   ├── utils/
│   │   │   ├── lead_enrichment.py   # Enrichment processor
│   │   ├── config/
│   │   │   ├── logging.py           # Logging configuration
│   │   │   ├── supabase.py          # Supabase client
│   │   ├── main.py                  # FastAPI app entry point
│   ├── .env                         # Environment variables
│   ├── requirements.txt             # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Contact.tsx          # Contact form component
│   │   ├── hooks/
│   │   │   ├── use-toast.ts         # Toast notification hook
│   ├── vite.config.ts               # Vite configuration with proxy
│   ├── package.json                 # Node dependencies
├── README.md                        # This file
```

## Prerequisites
- **Python 3.10+**: For the backend.
- **Node.js 18+**: For the frontend (or Bun as an alternative).
- **Supabase Account**: For the database (create at https://supabase.com).
- **Google ADK Credentials**: For lead enrichment (set up via Google Cloud Console).
- **Git**: To clone the repository.
- **OS**: Windows, Mac, or Linux.

## Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/pulse-fintech.git
   cd pulse-fintech
   ```

2. **Backend Setup**:
   - Navigate to the backend directory:
     ```bash
     cd backend
     ```
   - Create and activate a virtual environment:
     ```bash
     python -m venv venv
     source venv/bin/activate  # Mac/Linux
     venv\Scripts\activate     # Windows
     ```
   - Install dependencies:
     ```bash
     pip install -r requirements.txt
     ```
   - Create a `.env` file in `backend/` (see [Environment Variables](#environment-variables)).

3. **Frontend Setup**:
   - Navigate to the frontend directory:
     ```bash
     cd frontend
     ```
   - Install dependencies:
     ```bash
     npm install  # or bun install
     ```

4. **Supabase Setup**:
   - Create a Supabase project at https://supabase.com.
   - Create a table named `leads_table` with the following schema:
     ```sql
     CREATE TABLE leads_table (
       id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
       first_name TEXT,
       last_name TEXT,
       email TEXT,
       contact_number TEXT,
       city TEXT,
       country TEXT,
       company TEXT,
       interested_in TEXT,
       inquiry TEXT,
       enrichment_flag BOOLEAN DEFAULT FALSE,
       company_data JSONB,
       person_data JSONB,
       lead_score FLOAT,
       enrichment_status TEXT,
       error_details TEXT
     );
     ```
   - Note the project’s URL and API key for the `.env` file.

## Running the Application
1. **Start the Backend**:
   - In the `backend/` directory:
     ```bash
     venv\Scripts\activate  # Windows
     source venv/bin/activate  # Mac/Linux
     python -m src.main
     ```
   - The backend runs on `http://localhost:8000`. You should see:
     ```
     INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
     ```

2. **Start the Frontend**:
   - In a separate terminal, in the `frontend/` directory:
     ```bash
     npm run dev  # or bun dev
     ```
   - The frontend runs on `http://localhost:8080`.

3. **Access the App**:
   - Open `http://localhost:8080` in a browser.
   - Navigate to the "Contact" section and submit a form to test lead capture and enrichment.

## Testing the Application
1. **Test the Contact Form**:
   - Fill out the form at `http://localhost:8080` with:
     - First Name: John
     - Last Name: Doe
     - Email: john@example.com
     - Contact Number: +971500000000
     - City: Dubai
     - Country: United Arab Emirates
     - Company: Example Corp
     - Interested In: Digital Banking
     - Inquiry: Interested in fintech solutions
   - Expect a "Message Sent Successfully!" toast and an immediate response (enrichment runs synchronously).
   - Check Supabase `leads_table` for a new record with `enrichment_flag: true`.

2. **Test APIs Directly**:
   - Save a contact:
     ```bash
     curl -X POST http://localhost:8000/api/save-contact -H "Content-Type: application/json" -d '{"firstName": "John", "lastName": "Doe", "email": "john@example.com", "contactNumber": "+971500000000", "city": "Dubai", "country": "United Arab Emirates", "company": "Example Corp", "interestedIn": ["Digital Banking"], "inquiry": "Interested in fintech solutions"}'
     ```
     - Expect: `{"message":"Contact saved successfully","lead_id":123}`
   - Enrich the lead:
     ```bash
     curl -X POST http://localhost:8000/api/enrich-lead -H "Content-Type: application/json" -d '{"lead_id":123,"company_name":"Example Corp","person_name":"John Doe","enrichment_status":"pending"}'
     ```
     - Expect: Enriched data response with `company_data`, `person_data`, etc.

3. **Check Supabase**:
   - Log in to Supabase and verify `leads_table` has the inserted lead and enriched data.

## Environment Variables
Create a `.env` file in `backend/` with:
```
SUPABASE_URL=your-supabase-project-url
SUPABASE_KEY=your-supabase-api-key
GOOGLE_ADK_API_KEY=your-google-adk-api-key
```
- **SUPABASE_URL/KEY**: From your Supabase project dashboard.
- **GOOGLE_ADK_API_KEY**: From Google Cloud Console for ADK agent searches.

## Supabase Setup
- Ensure the `leads_table` schema matches the fields in `src/schemas/lead.py` (`Contact` and `DataEnrichment`).
- Enable Row Level Security (RLS) if needed, but disable for development to simplify access.

## Troubleshooting
- **Backend Errors**:
  - Check logs in the backend terminal for issues (e.g., missing `.env` variables, Supabase connection errors).
  - Ensure `requirements.txt` dependencies are installed (`pip install -r requirements.txt`).
- **Frontend Errors**:
  - Verify the Vite proxy in `frontend/vite.config.ts` points to `http://localhost:8000` for `/api` requests.
  - Check browser console (F12) for CORS or network errors.
- **Supabase Issues**:
  - Confirm `SUPABASE_URL` and `SUPABASE_KEY` are correct in `.env`.
  - Verify the `leads_table` schema includes all required columns.
- **Enrichment Issues**:
  - Ensure Google ADK credentials are valid.
  - Check logs in `backend/src/agents/lead_enrich/` for agent errors.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request.