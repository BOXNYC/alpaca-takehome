'use server'

import { Note } from "@/types/notes"
import OpenAI from "openai";

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

export async function summarize(content: string): Promise<string> {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
    });
    const notes = content || '';
    const completion = await openai.chat.completions.create({
        messages: [{
            role: 'user',
            content: `
                summarize my notes in an descriptive and readable format, whitout bullet points or numbers, and don't leave anything out. Use a clinical writing style

                Notes:
                ======
                ${notes}`
        }],
        model: 'gpt-4o',
    });
    if (!completion.choices.length) return content;
    return completion.choices[0].message.content as string;
}