// pages/notes.tsx
import { useEffect, useState } from "react";
import 'tailwindcss';

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
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-100 to-emerald-200 p-8">
    <div className="w-full max-w-2xl bg-white shadow-2xl p-8 rounded-2xl border border-emerald-200">
      <h1 className="text-3xl font-extrabold mb-6 text-emerald-600 text-center tracking-tight">
        📒 Danh sách Notes
      </h1>

      {/* Danh sách Notes */}
      <ul className="space-y-4 mb-8 max-h-[50vh] overflow-y-auto pr-2">
        {notes.map((n) => (
          <li
            key={n.id}
            className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl shadow-sm hover:shadow-md transition"
          >
            <h2 className="font-bold text-xl text-emerald-700 mb-1">{n.title}</h2>
            <p className="text-emerald-900 opacity-80">{n.content}</p>
            <button
              onClick={() => deleteNote(n.id)}
              className="mt-3 text-sm text-red-500 hover:text-red-600 font-medium underline"
            >
              Xóa
            </button>
          </li>
        ))}
      </ul>

      {/* Form thêm note */}
      <h2 className="text-2xl mb-4 text-emerald-700 font-semibold text-center">Thêm note mới</h2>
      <input
        placeholder="Tiêu đề"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="block border border-emerald-200 p-3 mb-3 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400"
      />
      <textarea
        placeholder="Nội dung"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="block border border-emerald-200 p-3 mb-4 w-full rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-emerald-400"
        rows={4}
      />
      <button
        onClick={addNote}
        className="bg-emerald-500 hover:bg-emerald-600 text-white p-3 rounded-xl w-full font-semibold text-lg transition"
      >
        ✏️ Thêm
      </button>
    </div>
  </div>
);
}
