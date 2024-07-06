const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb+srv://pareekananya1:1234@task-manager.v2sai3z.mongodb.net/?retryWrites=true&w=majority&appName=task-manager', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const TaskSchema = new mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
});

const Task = mongoose.model('Task', TaskSchema);

app.post('/tasks', async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.send(task);
});

app.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.send(tasks);
});

app.put('/tasks/:id', async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(task);
});

app.delete('/tasks/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.send({ message: 'Task deleted' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
