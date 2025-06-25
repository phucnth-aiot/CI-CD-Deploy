import { NoteList } from '../../components/features/notes/NoteList';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Notes',
  description: 'Manage your notes with full CRUD operations',
};

export default function NotesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <NoteList />
    </div>
  );
}
