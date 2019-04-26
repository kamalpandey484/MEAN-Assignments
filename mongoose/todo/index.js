const express = require('express');
const PORT= 3001;
const app = new express();
const cors = require('cors');
const mongoose = require('mongoose');
const Todo = require('./database/models/todo')

mongoose.connect('mongodb://localhost/todo');

app.use(cors());
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());


app.get('/',async (req,res)=>{
    const todos = await Todo.find({});
    console.log(todos);
    res.send(todos);
}).post('/', (req,res)=>{
    res.setHeader('Content-Type' , 'application/json');
    Todo.create(req.body, (err,todo)=>{
        console.log(err,todo)
    });
    res.end("success");
}).delete('/:id', (req,res)=>{
    console.log(req.params.id)
    Todo.findOneAndDelete({_id: (req.params.id)}, (err,result)=>{
        console.log(err,result);
    });
    res.end("Deleted");
});

app.listen(PORT, ()=>{
    console.log(`App running at port ${PORT}`);
});