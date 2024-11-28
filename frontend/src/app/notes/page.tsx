'use client'

import { Note } from "@/types/notes";
import { useEffect, useState } from "react";
import { getNotes } from "../actions/notes";
import Link from "next/link";

export default function Notes() {
    const [notes, setNotes] = useState<Note[]>([]);
    useEffect(() => {
        getNotes().then((resp: Note[])=> {
            setNotes(resp);
        }).catch((err: Error) => {
            console.error(err);
        });
    }, []);
    return (
        <div className="flex min-h-screen flex-col items-center justify-center space-8 p-8 text-center">
            <h1 className="text-3xl font-bold mb-8">
                All Patient Notes
            </h1>
            <ul className="flex w-full">
                {!notes.length && <li><em>No notes found</em></li>}
                {!!notes.length && notes.map((note: Note, index) => (<li key={index} className="mb-4 w-[50%]">
                    <h2 className="text-xl font-bold">{note.patientName}</h2>
                    <Link href={`/notes/${index}`}>View / Edit</Link>
                </li>))}
            </ul>
        </div>
    );
}
