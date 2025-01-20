import { useEffect, useState } from 'react';
import { Note } from './interfaces';
import { getNotes, addNote, deleteNote, editNote } from './Api';
import Notes from './components/Notes';
import NoteForm from './components/NoteForm';
import './App.css';

const App = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [updated, setUpdated] = useState(false);

  // получаем список заметок из API и устанавливаем его в state
  const fetchNotes = async () => {
    try {
      const data = await getNotes();
      setNotes(data);
    } catch (error) {
      console.error('Ошибка при загрузке заметок:', error);
    }
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

  // добавляем (редактируем) заметку и устанавливаем updated в true
  const handleAddEditNote = async (content: string) => {
    try {
      if (editingNote && editingNote.id) {
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
      }
      setUpdated(true);
    } catch (error) {
      console.error('Ошибка при сохранении заметки:', error);
    }
  }

  // удаляем заметку и устанавливаем updated в true
  const handleDeleteNote = async (id: number) => {
    try {
      await deleteNote(id);
      setUpdated(true);
    } catch (error) {
      console.error('Ошибка при удалении заметки:', error);
    }
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
      <NoteForm onAdd={handleAddEditNote} editingNote={editingNote} />
    </div>
  );
}

export default App;
