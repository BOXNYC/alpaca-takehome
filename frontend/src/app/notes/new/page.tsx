'use client'

import NoteForm from "@/components/NoteForm";
import { Note } from "@/types/notes";
import { useCallback } from "react";
import { createNote } from "@/app/actions/notes";
import { useRouter } from "next/navigation";

export default function NotesNew() {
  const router = useRouter();
  const saveNote = useCallback(async (formData: FormData) => {
    const note = Object.fromEntries(formData) as Note;
    note.content = '';
    const notes = await createNote(note);
    router.push(`/notes/${notes.data.length-1}`);
  }, []);
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 p-8 text-center">
      <h1 className="text-3xl font-bold">
        Create a new patient note
      </h1>

      <div className="rounded-md bg-yellow-50 p-4 text-yellow-800">
        <NoteForm action={saveNote} />
      </div>
      
    </div>
  );
}
