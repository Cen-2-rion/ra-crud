import { Note } from './interfaces';

const API_URL = 'http://localhost:7070/notes';

// получаем все заметки с сервера
export const getNotes = async (): Promise<Note[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Ошибка!');
  }
  return response.json();
}

// добавляем новую заметку на сервер
export const addNote = async (content: string): Promise<void> => {
  await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: 0, content }),
  });
}

// удаляем заметку с сервера
export const deleteNote = async (id: number): Promise<void> => {
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
}
