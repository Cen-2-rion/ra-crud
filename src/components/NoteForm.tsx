import { useEffect, useState } from 'react';
import { NoteFormProps } from '../interfaces';

const NoteForm = ({ onAdd, editingNote }: NoteFormProps) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    if (editingNote) {
      setContent(editingNote.content); // заполняем поле при редактировании
    }
  }, [editingNote]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (content.trim()) {
      onAdd(content);
      setContent('');
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  }

  return (
    <form className='form' onSubmit={handleSubmit}>
      <label htmlFor='content'>{editingNote ? 'Edit Note' : 'New Note'}</label>
      <textarea className='form-content'
        id='content'
        name='content'
        value={content}
        onChange={handleChange}
        placeholder='Write your note here...'
        required
      />
      <button className='form-button' type='submit'>➤</button>
    </form>
  );
}

export default NoteForm;
