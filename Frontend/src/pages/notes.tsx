// pages/notes.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import NoteForm from '../components/redisForm';
import NoteList from '../components/noteList';
interface Note {
  id: number;
  title: string;
  content: string;
}

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/notes');
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const addNote = async (title: string, content: string) => {
    try {
      const response = await axios.post('http://localhost:3000/api/notes', { title, content });
      setNotes([...notes, response.data]);
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const deleteNote = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/api/notes/${id}`);
      setNotes(notes.filter(note => note.id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Quản lý ghi chú</h1>
      <NoteForm onAddNote={addNote} /> {/* Correct component */}
      <NoteList notes={notes} onDeleteNote={deleteNote} />
    </div>
  );
}