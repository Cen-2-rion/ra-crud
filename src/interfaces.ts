export interface Note {
  id: number,
  content: string,
}

export interface NotesProps {
  notes: Note[],
  onDelete: (id: number) => void,
}

export interface NoteFormProps {
  onAdd: (content: string) => void,
}
