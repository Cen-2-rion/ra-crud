import { useEffect, useState } from 'react';
import { Note } from './interfaces';
import { getNotes, addNote, deleteNote } from './Api';
import Notes from './components/Notes';
import NoteForm from './components/NoteForm';
import './App.css';

const App = () => {
  const [notes, setNotes] = useState<Note[]>([]);
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

  // добавляем новую заметку и устанавливаем updated в true
  const handleAddNote = async (content: string) => {
    await addNote(content);
    setUpdated(true);
  }

  // удаляем заметку и устанавливаем updated в true
  const handleDeleteNote = async (id: number) => {
    await deleteNote(id);
    setUpdated(true);
  }

  return (
    <div className='container'>
      <div className='header'>
        <h1 className='title'>Notes</h1>
        <button className='refresh-button' onClick={fetchNotes}>↻</button>
      </div>
      <Notes notes={notes} onDelete={handleDeleteNote} />
      <NoteForm onAdd={handleAddNote} />
    </div>
  );
}

export default App;
