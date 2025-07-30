# AI Resume Generator

An application that generates PDF resumes based on user prompts and templates using OpenAI GPT models through LangChain.

## Architecture

-   **Frontend**: React with TypeScript (Port 80)
-   **Backend**: NestJS with TypeScript (Port 8080)
-   **AI Integration**: LangChain + OpenAI GPT
-   **PDF Generation**: HTML/CSS templates converted to PDF
-   **Common Library**: Shared TypeScript models

## Project Structure

```
root/
├── .vscode/              # VS Code configuration
├── backend/              # NestJS backend application
├── frontend/             # React frontend application
├── commonLib/            # Shared TypeScript models
├── docker-compose.yml    # Docker orchestration
└── README.md
```

## Features

-   Multiple resume templates (classic, modern, creative)
-   Template preview and selection
-   Form fields with "lock data" option
-   AI-powered content generation
-   In-template editing after generation
-   PDF download

## Prerequisites

-   Docker
-   Docker Compose
-   OpenAI API Key

## Environment Setup

1. Clone the repository
2. Create `.env` file in the backend directory:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

## Quick Start

1. Build and start all services:

```bash
docker-compose up --build
```

2. Access the application:

-   Frontend: http://localhost
-   Backend API: http://localhost:8080

## Development

To stop the application:

```bash
docker-compose down
```

To rebuild after changes:

```bash
docker-compose up --build
```

## How It Works

1. User fills form fields (name, position, education, experience, skills)
2. User selects desired resume template
3. User marks fields to "lock" (preserve original data)
4. User provides additional prompt for AI enhancement
5. AI processes unlocked fields and generates structured JSON
6. Application renders data into selected HTML template
7. User can edit content directly in the template
8. PDF is generated and downloaded locally

## API Endpoints

-   `POST /api/generate` - Generate resume data from prompt
-   `POST /api/pdf` - Convert HTML template to PDF

## Technology Stack

-   **Frontend**: React, TypeScript, HTML/CSS templates
-   **Backend**: NestJS, TypeScript, LangChain
-   **AI**: OpenAI GPT (user-selectable models)
-   **PDF**: Puppeteer
-   **Containerization**: Docker, Docker Compose
