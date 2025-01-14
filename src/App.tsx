import { useEffect, useState } from 'react';
import { Note } from './interfaces';
import { getNotes, addNote, deleteNote, editNote } from './Api';
import Notes from './components/Notes';
import NoteForm from './components/NoteForm';
import './App.css';

const App = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [updated, setUpdated] = useState<boolean>(false);

  // получаем список заметок из API и устанавливаем его в state
  const fetchNotes = async () => {
    const data = await getNotes();
    setNotes(data);
  }

  // загружаем список заметок при старте приложения
  useEffect(() => {
    fetchNotes();
  }, []);

  // при изменении updated загружаем список заметок и сбрасываем updated
  useEffect(() => {
    if (updated) {
      fetchNotes();
      setUpdated(false);
    }
  }, [updated]);

  // редактируем, добавляем заметку и устанавливаем updated в true
  const handleAddNote = async (content: string) => {
    if (editingNote) {
      await editNote(editingNote.id, content);

      // обновляем локальное состояние заметок
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === editingNote.id ? { ...note, content } : note
        )
      );
      // сбрасываем состояние редактирования
      setEditingNote(null);
    } else {
      await addNote(content);
      setUpdated(true);
    }
  }

  // удаляем заметку и устанавливаем updated в true
  const handleDeleteNote = async (id: number) => {
    await deleteNote(id);
    setUpdated(true);
  }

  // редактируем заметку и устанавливаем editingNote в state
  const handleEditNote = (note: Note) => {
    setEditingNote(note);
  }

  return (
    <div className='container'>
      <div className='header'>
        <h1 className='title'>Notes</h1>
        <button className='refresh-button' onClick={fetchNotes}>↻</button>
      </div>
      <Notes notes={notes} onDelete={handleDeleteNote} onEdit={handleEditNote} />
      <NoteForm onAdd={handleAddNote} editingNote={editingNote} />
    </div>
  );
}

export default App;
