const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app =  express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://shyamsundarko:Shyamvar1993@cluster0.tisvq.mongodb.net/toDoList?retryWrites=true&w=majority', { // connect to db // can always use this block 
    useNewUrlParser: true,
    useUnifiedTopology: true
})  .then(() => console.log("Connected to DB"))
    .catch(console.error);

 

const Todo = require('./models/Todo'); // model for the type of data that is going to be received/sent from/to the db

//////////////////////////////////////////////// here we are getting the data from the db. Using the Todo model, we are looking for data of the same type as the model in the db
app.get('/todos', async(req, res) => {
    const todos =  await Todo.find();
    res.json(todos);
});

//////////////////////////////////////////////
app.post('/todo/new', async (req, res) => {
    const todo = new Todo({
        text: req.body.text
    });

    todo.save();
    res.json(todo);
});
/////////////////////////////////////////////deleting
app.delete('/todo/delete/:id', async (req, res) => {
    const result = await Todo.findByIdAndDelete(req.params.id);
    res.json(result);
});

/////////////////////////////////////////////toggle completing our todo
app.get('/todo/complete/:id', async (req,res) => {
    const todo = await Todo.findById(req.params.id);
    todo.complete = !todo.complete;
    todo.save();
    res.json(todo);
});

app.listen(3001, () => console.log("server started on port 3001"));