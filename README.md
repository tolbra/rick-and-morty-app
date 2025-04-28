<p align="center">
  <img src="[https://upload.wikimedia.org/wikipedia/en/6/6f/Rick_and_Morty_title_card.png](https://e7.pngegg.com/pngimages/479/224/png-clipart-rick-and-morty-rick-sanchez-rick-and-morty-season-3-adult-swim-rick-and-morty-season-2-episode-rick-and-morty-grass-fictional-character.png)" width="400" alt="Rick and Morty Explorer" />
</p>

<h1 align="center">Rick and Morty Explorer</h1>

<p align="center">
  Fullstack app to explore the multiverse — Search characters, chat with Rick, and toggle Drunk Mode!<br/>
  <br/>
  <a href="https://your-deployed-site-link.com"><strong>🚀 Live Demo »</strong></a>
</p>

---

# 🎯 Project Overview

A web application built with **Next.js + Tailwind CSS** and a **FastAPI** backend, allowing users to:

- 🔍 Search for Rick and Morty characters with advanced filters and pagination.
- 🌎 Browse locations and episodes via a custom API proxy.
- 🧠 Interact with a creative "Ask Rick" chat powered by OpenAI, mimicking Rick Sanchez's persona.
- 🗓 Discover a Character of the Day and Episode of the Day with a daily countdown.
- 🍻 Toggle a playful Drunk Mode and Dark/Light theme.

This public repo demonstrates a **full-stack prototype** complete with deployment instructions and a demo video.

---

# 🚀 Tech Stack

- **Frontend:** Next.js (App Router), Tailwind CSS, React, dynamic imports (CountdownTimer)
- **Backend:** FastAPI, Uvicorn, Python, requests, openai SDK
- **AI Integration:** OpenAI GPT-3.5-turbo for "Ask Rick" chat
- **Styling & UX:** Tailwind CSS, CSS variables, dark mode (`dark:`), Framer Motion for animations
- **Hosting:** Vercel for frontend, Railway/Heroku for backend (example)

> **Why this stack?**  
> Python and FastAPI enable rapid API development; Next.js provides hybrid SSR/CSR; Tailwind CSS accelerates styling; OpenAI powers creative conversational features.

---

# 📦 Installation & Usage

```bash
# Clone the repository
git clone https://github.com/<your-username>/rick-and-morty-app.git
cd rick-and-morty-app

# Backend Setup
cd backend
python -m venv venv
source venv/bin/activate    # macOS/Linux
venv\Scripts\activate       # Windows

pip install -r requirements.txt

# Set your OpenAI API key
export OPENAI_API_KEY=<your_openai_key>

# Run backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Frontend Setup
cd ../frontend
npm install
npm run dev

# Visit http://localhost:3000

# Features
# - Explore Character of the Day & Episode of the Day
# - Ask Rick using Chat section
# - Search characters by name, status, gender with pagination
# - Toggle Drunk Mode for effects
# - Switch between Dark and Light Themes
