Rick and Morty Explorer

🎯 Project Overview

A web application (Next.js + Tailwind CSS) and backend (FastAPI) that lets users:

Search for Rick and Morty characters with advanced filters and pagination.

Browse locations and episodes via a custom API proxy.

Interact with a creative "Ask Rick" chat powered by OpenAI, mimicking Rick Sanchez's persona.

Discover a Character of the Day and Episode of the Day with a daily countdown.

Toggle a playful Drunk Mode and Dark/Light theme.

This public repo demonstrates a full-stack prototype complete with deployment instructions and a demo video.

🚀 Tech Stack

Frontend: Next.js (App Router), Tailwind CSS, React, dynamic imports (CountdownTimer)

Backend: FastAPI, Uvicorn, Python, requests, openai SDK

AI Integration: OpenAI GPT-3.5-turbo for "Ask Rick" chat

Styling & UX: Tailwind CSS, CSS variables, Tailwind dark mode (dark:), Framer Motion for animations

Hosting: Vercel for frontend, Railway/Heroku for backend (example)

Why this stack? Python and FastAPI provide rapid API development; Next.js offers hybrid SSR/CSR and seamless CSS integration; Tailwind CSS accelerates styling; OpenAI powers creative conversational features.

📦 Installation & Setup

Clone the repo

git clone https://github.com/<username>/rick-and-morty-app.git
cd rick-and-morty-app

Backend

cd backend
python -m venv venv
source venv/bin/activate   # macOS/Linux
venv\Scripts\activate    # Windows
pip install -r requirements.txt
export OPENAI_API_KEY=<your_openai_key>
uvicorn main:app --reload --host 0.0.0.0 --port 8000

Frontend

cd ../frontend
npm install
npm run dev

The frontend expects the backend at http://localhost:8000 (see lib/api.ts).

💻 Usage

Navigate to http://localhost:3000.

Use the Featured Today section:

Character of the Day & Episode of the Day with a countdown timer.

Click Ask Rick! to scroll to chat and ask Rick about the episode.

Search characters by name, status, gender; use pagination.

Toggle Drunk Mode for a fun wobble effect and slight blur.

Switch between Dark and Light themes; UI adapts via Tailwind dark: classes and CSS variables.

🛠️ Design & Development Process

API Proxy: Wrapped the public Rick and Morty API in FastAPI routes (/characters, /locations, /episodes) to handle CORS and custom error handling.

Data Fetching: Frontend uses lib/api.ts to call backend endpoints, abstracting Fetch logic and error handling.

Creative Features:

Ask Rick Chat: Integrated OpenAI; message history with typing indicator; autoscroll only on external trigger.

Daily Features: Used deterministic dayOfYear % totalCount to select daily items.

Drunk Mode: Tailwind keyframes for wobble; conditional blur-sm filter.

Voice Search: Web Speech API for voice input in search bar.

Styling: Tailwind CSS utilities; customized theme colors via CSS variables; dark: modifiers for theme switching.

✨ Unique Approaches & Methodologies

Client-only dynamic imports for components relying on browser APIs (CountdownTimer, VoiceSearch).

External trigger flag to precisely control autoscrolling in chat, avoiding unwanted jumps.

Deterministic randomness for daily features, ensuring consistency across sessions.

Modular API client (lib/api.ts) enabling easy swap to another backend or direct public API.

Playing with UI: Drunk Mode, skeleton loaders, and skeleton-based placeholder UX.

⚖️ Trade-offs & Decisions

FastAPI vs. Direct Fetch: Chose FastAPI proxy to implement custom caching, error normalization, and centralize CORS policies.

SSR vs CSR: Most of the app is static/SSR for SEO; client-only imports disabled SSR where needed (CountdownTimer).

Time constraints: Skipped full authentication for voice TTS; left as a future extension.

🐞 Known Issues

Voice TTS integration with FakeYou proved unreliable and was postponed.

Mobile layout for Drunk Mode can feel cramped; requires responsive tweaks.

Episode and character details pages could cache more aggressively.

No e2e tests; consider Cypress or Playwright for critical flows.

🎥 Demo Video
https://drive.google.com/file/d/1Y1ec5lQVCaoQRyRFp0FQGtg7eRYdrLS4/view?usp=sharing

Watch the 3‑minute demo

❤️ Have fun exploring and feel free to open issues or PRs!

