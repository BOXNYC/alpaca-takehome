import NoteForm from "@/components/NoteForm";

export default async function LoadNote({ params }: { params: Promise<{ index: string }> }) {
    const id = Number((await params).index);
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-8 p-8 text-center">
            <h1 className="text-3xl font-bold">
                Note #{String((await params).index+1).padStart(4, '0')}
            </h1>
            <div className="w-full">
                <NoteForm id={id} />
            </div>
        </div>
    );
}