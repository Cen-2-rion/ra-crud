import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

// создание экземпляра сервера Express
const app = express();

// включение CORS для обмена данными между фронтендом и бэкендом
app.use(cors());

// использование body-parser для получения и обработки JSON в теле запросов
app.use(bodyParser.json({
  type: (req) => {
    return req.is('application/json');
  },
}));

// настройка заголовка Content-Type для отправки JSON в ответах
app.use(function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  next();
});

// массив заметок и следующий ID заметки
const notes = [];
let nextId = 1;

// GET: получение всех заметок
app.get('/notes', (req, res) => {
  res.send(JSON.stringify(notes));
});

// GET: получение одной заметки по ID
app.post('/notes', (req, res) => {
  notes.push({ ...req.body, id: nextId++ });
  res.status(204);
  res.end();
});

// DELETE: удаление заметки по id
app.delete('/notes/:id', (req, res) => {
  const noteId = Number(req.params.id);
  const index = notes.findIndex((o) => o.id === noteId);
  if (index !== -1) {
    notes.splice(index, 1);
  }
  res.status(204);
  res.end();
});

// PUT: изменение заметки по ID
app.put('/notes/:id', (req, res) => {
  const noteId = Number(req.params.id);
  const index = notes.findIndex((o) => o.id === noteId);
  if (index !== -1) {
    notes[index] = {body, id: noteId };
  }
  res.status(204);
  res.end();
});

// запуск сервера
const port = process.env.PORT || 7070;
app.listen(port, () => console.log(`The server is running on http://localhost:${port}`));
