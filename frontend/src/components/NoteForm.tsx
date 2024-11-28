'use client'

import { getNoteById, summarize, updateNoteById } from "@/app/actions/notes";
import { Note } from "@/types/notes";
import { useCallback, useEffect, useState } from "react";

export default function NoteForm({action, id}: {action?: (formData: FormData) => void, id?: number}) {
    const [note, setNote] = useState<Note | null>(null);

    const updateAction = useCallback((formData: FormData) => {
        const updatedNote = Object.fromEntries(formData) as Note;
        updateNoteById(id as number, updatedNote);
        setNote(updatedNote);
    }, [setNote, id]);

    const generateSummary = useCallback(async () => {
        const summary = await summarize(note?.content || '');
        setNote({...note, content: summary});
    }, [setNote, note]);

    useEffect(() => {
        if (id !== undefined) getNoteById(id).then((note: Note) => {
            setNote(note);
        }).catch((err: Error) => {
            console.error(err);
        });
    }, [id]);

    const createMode = id === undefined;
    const editMode = !createMode;
    
    return (<form action={action || updateAction}>
        <div className="mb-4">
            <label className="block mb-4">Patient's Name</label>
            <input
                type={editMode ? 'hidden' : 'text'}
                name="patientName"
                placeholder="Patient's Name"
                required
                defaultValue={note?.patientName}
                className="rounded-full px-4 py-2 border border-gray-300 text-lg w-full"
            />
            {editMode && note?.patientName}
        </div>
        {editMode && <div className="mb-4">
            <textarea
                name="content"
                placeholder="Enter your note here..."
                className="w-full h-32 p-2 border border-gray-300 rounded-md"
                required={editMode}
                value={note?.content || ''}
                onChange={(e) => setNote({...note, content: e.target.value})}
            ></textarea>
        </div>}
        <button
            className="w-100 border border-gray-300 rounded-full py-2 px-8"
        >{editMode ? 'Update' : 'Create'} Note</button>
        {editMode && <p className="py-4"><button className="bg-[#0c9586] rounded-full py-2 px-8 text-xl text-white" onClick={generateSummary}><span className="">✨</span> Summarize</button></p>}
    </form>)
}