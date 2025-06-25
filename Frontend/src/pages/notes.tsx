// pages/notes.tsx
import { useEffect, useState } from "react";

type Note = { id: number; title: string; content: string };

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const fetchNotes = async () => {
    const res = await fetch(`http://localhost:3000/api/notes`);
    setNotes(await res.json());
  };
  useEffect(() => { fetchNotes(); }, []);

  const addNote = async () => {
    await fetch(`http://localhost:3000/api/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    setTitle("");
    setContent("");
    fetchNotes();
  };
  const deleteNote = async (id: number) => {
    await fetch(`http://localhost:3000/api/notes/${id}`, { method: "DELETE" });
    fetchNotes();
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-8">
      <div className="max-w-2xl mx-auto bg-white shadow-xl p-6 rounded-xl">
        <h1 className="text-2xl font-bold mb-4 text-green-600">Danh sách notes</h1>
        <ul className="space-y-2 mb-6">
          {notes.map((n) => (
            <li key={n.id} className="border border-green-200 p-3 rounded-lg">
              <h2 className="font-bold text-green-800">{n.title}</h2>
              <p>{n.content}</p>
              <button
                onClick={() => deleteNote(n.id)}
                className="mt-2 text-red-500 hover:underline"
              >Xóa</button>
            </li>
          ))}
        </ul>

        <h2 className="text-xl mb-2 text-green-700">Thêm note mới</h2>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="block border p-2 mb-2 w-full rounded"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="block border p-2 mb-2 w-full rounded"
        />
        <button
          onClick={addNote}
          className="bg-green-500 hover:bg-green-600 text-white p-2 rounded w-full"
        >Thêm</button>
      </div>
    </div>
  );
}
