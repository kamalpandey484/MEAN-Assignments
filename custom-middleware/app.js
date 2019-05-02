var express = require("express");
var cors=require('cors');
const app = express();
const port = 4000;
var request=require('./githubUserFetch');
const { execFile } = require('child_process');
const {pipeExample}=require('./streamExample');
const {printBuffer}=require('./bufferExample');
const {authentication}=require('./middlewares');

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



//buffer example
printBuffer();

//pipe and streams example

pipeExample();


//exec file


execFile('ls', (error, stdout, stderr) => {
    if (error) {
        throw error;
        console.log(error)
    }
    console.log("printing list of files \n",stdout);
});


app.get('/',(req,res)=>{
    res.send("some path")
});


app.get('/users',(req,res,next)=>{
    request.getData().then(result=>{
        console.log(result.data)
        res.send(result.data)
    })
});

app.post('/login',authentication,(req,res,next)=>{
    if(req.body.isAuthenticated){
        res.send("authentication successfull");
    }
    else{
        res.send("not authenticated");
    }


});

