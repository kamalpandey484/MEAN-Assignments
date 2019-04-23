const http = require('http');
const fs = require('fs');
const data = require('./studentdata.js');

const index = fs.readFileSync('index.html');
const about = fs.readFileSync('about.html');
const contact = fs.readFileSync('contact.html');
const server = http.createServer(function (request,response) {
    switch(request.url){
        case '/':
            response.writeHead(200,{'Content-Type' : 'text/html'});
            response.write(index);
            response.end();
            break;
        case '/about':
            response.writeHead(200,{'Content-Type' : 'text/html'});
            response.write(about);
            response.end();
            break;
        case '/contact':
            response.writeHead(200,{'Content-Type' : 'text/html'});
            response.write(contact);
            response.end();
            break;
        case '/data':
            response.writeHead(200, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Headers':'*',
                'Access-Control-Allow-Methods':'*'
            })
            response.write(JSON.stringify(data));
            response.end();
            break;
        default:
            response.writeHead(404,{'Content-Type' : 'text/html'});
            response.write("404-Page Not Found !!!!!!!!!!");
            response.end();
    }
});

server.listen(4000,(res)=>{
    console.log("App running at port 30000");
});