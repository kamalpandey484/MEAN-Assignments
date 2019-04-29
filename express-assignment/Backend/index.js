const express = require('express');
const PORT= 3001;
const app = new express();
const cors = require('cors');
let users=require('./data.js');


app.use(cors());
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use((req,res,next)=>{
    if(req.method==="POST"){
        req.body.createdAt=new Date();
        next();
    }
    next();
});

app.get('/',(req,res)=>{
    console.log(JSON.stringify(users));
    res.send(users);
}).post('/', (req,res, next)=>{
    res.setHeader('Content-Type' , 'application/json');
    let date = new Date();
    let newstudent = {
        id : req.body.id,
        name : req.body.name,
        email : req.body.email,
        contact : req.body.contact,
        createdAt:req.body.createdAt
    };
    users.push(newstudent);
    res.end("success");
}).delete('/:id' , (req,res)=>{
   users = users.filter(item=>item.id !== req.params.id);
   res.send(users);
});

app.listen(PORT, ()=>{
    console.log(`App running at port ${PORT}`);
});