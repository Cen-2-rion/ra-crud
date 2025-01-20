import { Note } from './interfaces';

const API_URL = 'http://localhost:7070/notes';

// получаем все заметки
export const getNotes = async (): Promise<Note[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Ошибка получения заметок: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw error; // пробрасываем ошибку для дальнейшей обработки
  }
}

// добавляем новую заметку
export const addNote = async (content: string): Promise<void> => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: 0, content }),
    });
    if (!response.ok) {
      throw new Error(`Ошибка добавления заметки: ${response.statusText}`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// удаляем заметку
export const deleteNote = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!response.ok) {
      throw new Error(`Ошибка удаления заметки: ${response.statusText}`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// редактируем заметку
export const editNote = async (id: number, content: string): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });
    if (!response.ok) {
      throw new Error(`Ошибка редактирования заметки: ${response.statusText}`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
