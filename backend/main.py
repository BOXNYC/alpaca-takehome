from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
# import json

NOTES = []

class Note(BaseModel):
    content: str
    patientName: str

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def health_check():
    return {"status": "healthy"}

@app.post("/api/note")
async def create_note(note: Note):
    NOTES.append(note)
    return {"status": "ok", "data": NOTES}

@app.get("/api/note")
async def get_notes():
    return {"status": "ok", "data": NOTES}

@app.put("/api/note/{note_id}")
async def update_note(note_id: int, note: Note):
    NOTES[note_id] = note
    return {"status": "ok", "data": NOTES}