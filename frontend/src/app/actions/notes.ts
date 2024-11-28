'use server'

import { Note } from "@/types/notes"

const API_URL = process.env.API_URL || ''

/**
 * createNote() - Create a new note
 * @param note : Note
 * @returns <Response>
 */
export async function createNote(note: Note) {
    const resp = await fetch(`${API_URL}/api/note`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
    });
    return await resp.json();
}

export async function getNotes(): Promise<Note[]> {
    const resp = await fetch(`${API_URL}/api/note`);
    const json = await resp.json();
    return json.data;
}

export async function getNoteById(id: number): Promise<Note> {
    const notes = await getNotes();
    return notes[id];
}

export async function updateNoteById(id: number, note: Note): Promise<Note> {
    const resp = await fetch(`${API_URL}/api/note/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
    });
    return await resp.json();
}