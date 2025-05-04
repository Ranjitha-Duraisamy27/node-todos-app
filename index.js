const express = require('express');
const mongoose = require('mongoose');
const app = express();

const mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/todoapp';
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });

const Todo = mongoose.model('todos', { task: String });

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
  const todos = await Todo.find();
  res.render('index', { todos });
});

app.post('/add', async (req, res) => {
  const { task } = req.body;
  if (task) {
    await new Todo({ task }).save();
  }
  res.redirect('/');
});

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
});

