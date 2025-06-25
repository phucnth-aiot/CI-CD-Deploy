// components/NoteForm.tsx
import { useState } from 'react';

interface NoteFormProps {
  onAddNote: (title: string, content: string) => void;
}

export default function NoteForm({ onAddNote }: NoteFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && content) {
      onAddNote(title, content);
      setTitle('');
      setContent('');
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Thêm ghi chú mới</h2>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Tiêu đề"
          className="p-2 border rounded"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Nội dung"
          className="p-2 border rounded"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Thêm ghi chú
        </button>
      </div>
    </div>
  );
}
