import { NotesProps } from '../interfaces';

const Notes = ({ notes, onDelete, onEdit }: NotesProps) => {
  return (
    <div className='notes-container'>
      {notes.map((note) => (
        <div key={note.id} className='note'>
          <p className='note-content'>{note.content}</p>
          <button className='delete-button' onClick={() => onDelete(note.id)}>✖</button>
          <button className='edit-button' onClick={() => onEdit(note)}>✎</button>
        </div>
      ))}
    </div>
  );
}

export default Notes;
