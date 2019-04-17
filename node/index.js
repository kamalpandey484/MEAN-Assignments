
const http = require('http');
const fs = require('fs');

// let about;
// const index =fs.readFile('index.html', async (err, data) => {
//     console.log(data.toString());
//     await fs.writeFile('about.html', data.toString());
//     about = fs.readFileSync('about.html');
// })

const index = fs.readFileSync('index.html')
const about = fs.readFileSync('about.html');
const contact = fs.readFileSync('contact.html');

const server = http.createServer(function (request, response){
    if(request.url==='/') {
        response.end(index);
    }
    else if(request.url==='/about') {
        response.end(about);
    }else if(request.url ==='/contact'){
        response.end(contact)
    }else {
        response.writeHead(404);
        response.end('Error 404 Page not Found');
    }
})

server.listen(3000, (res)=>{
    console.log("App Running at port 3000");
});