// components/NoteList.tsx
interface Note {
  id: number;
  title: string;
  content: string;
}

interface NoteListProps {
  notes: Note[];
  onDeleteNote: (id: number) => void;
}

export default function NoteList({ notes, onDeleteNote }: NoteListProps) {
  return (
    <div className="grid gap-4">
      {notes.map(note => (
        <div key={note.id} className="p-4 border rounded shadow">
          <h3 className="text-lg font-semibold">{note.title}</h3>
          <p>{note.content}</p>
          <button
            onClick={() => onDeleteNote(note.id)}
            className="mt-2 bg-red-500 text-white p-1 rounded hover:bg-red-600"
          >
            Xóa
          </button>
        </div>
      ))}
    </div>
  );
}
