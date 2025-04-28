from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import requests, openai, os
from pydantic import BaseModel

client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

RICK_API = "https://rickandmortyapi.com/api"


@app.get("/characters")
def get_characters(name: str = "", page: int = 1, status: str = "", gender: str = ""):
    url = "https://rickandmortyapi.com/api/character"
    params = {
        "name": name,
        "page": page,
        "status": status,
        "gender": gender,
    }

    response = requests.get(url, params=params)

    if response.status_code == 404:
        return {
            "info": {
                "count": 0,
                "pages": 1,
            },
            "results": [],
        }

    response.raise_for_status()

    return response.json()

@app.get("/character/{character_id}")
def get_character(character_id: int):
    url = f"https://rickandmortyapi.com/api/character/{character_id}"
    response = requests.get(url)

    if response.status_code == 404:
        return {"error": "Not found"}

    response.raise_for_status()
    return response.json()


#список эпиз
@app.get("/episodes")
def list_episodes(
    name: str = "",
    episode: str = "",
    page: int = 1
):
    params = {"page": page}
    if name:
        params["name"] = name
    if episode:
        params["episode"] = episode

    resp = requests.get(f"{RICK_API}/episode", params=params)
    if not resp.ok:
        raise HTTPException(status_code=resp.status_code, detail=resp.text)
    return resp.json()


#детали эпизодов
@app.get("/episodes/{episode_ids}")
def get_episode_or_batch(episode_ids: str):
    """
    Если episode_ids = "10" — вернёт объект одного эпизода,
    если episode_ids = "10,28,1" — вернёт массив эпизодов.
    """
    resp = requests.get(f"{RICK_API}/episode/{episode_ids}")
    if not resp.ok:
        raise HTTPException(status_code=resp.status_code, detail=resp.text)
    return resp.json()

@app.get("/characters/{ids}")
def proxy_characters_by_ids(ids: str):
    resp = requests.get(f"{RICK_API}/character/{ids}")
    if not resp.ok:
        raise HTTPException(status_code=resp.status_code, detail=resp.text)
    return resp.json()

#для одного перса
@app.get("/character/{char_id}")
def proxy_character_detail(char_id: int):
    resp = requests.get(f"{RICK_API}/character/{char_id}")
    if not resp.ok:
        raise HTTPException(status_code=resp.status_code, detail=resp.text)
    return resp.json()

#локации
@app.get("/locations")
def proxy_locations(name: str = "", type: str = "", dimension: str = "", page: int = 1):
    params = {"page": page}
    if name:      params["name"] = name
    if type:      params["type"] = type
    if dimension: params["dimension"] = dimension
    resp = requests.get(f"{RICK_API}/location", params=params)
    if not resp.ok:
        raise HTTPException(status_code=resp.status_code, detail=resp.text)
    return resp.json()

@app.get("/locations/{loc_id}")
def proxy_location_detail(loc_id: int):
    resp = requests.get(f"{RICK_API}/location/{loc_id}")
    if not resp.ok:
        raise HTTPException(status_code=resp.status_code, detail=resp.text)
    return resp.json()

class QuestionRequest(BaseModel):
    question: str

@app.post("/ask-rick")
def ask_rick(req: QuestionRequest):
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "Ты Рик Санчез. Отвечай коротко, грубо и умно."},
                {"role": "user", "content": req.question},
            ],
            temperature=0.7,
            max_tokens=100,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0,
        )

        return {"answer": response.choices[0].message.content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



@app.get("/")
def root():
    return {"message": "Rick and Morty FastAPI backend is running 🚀"}



