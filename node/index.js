
const http = require('http');
const fs = require('fs');
const circle = require('./circle.js')

// let about;
// const index =fs.readFile('index.html', async (err, data) => {
//     console.log(data.toString());
//     await fs.writeFile('about.html', data.toString());
//     about = fs.readFileSync('about.html');
// })

const index = fs.readFileSync('index.html');
const about = fs.readFileSync('about.html');
const contact = fs.readFileSync('contact.html');

const server = http.createServer(function(request, response) {
  if (request.url==='/') {
      response.writeHead(200, { 'Content-Type': 'text/html',
          'Trailer': 'Content-MD5' });
     response.write(index);
     response.write(`Addition is ${circle.add()}
                    Subtraction is ${circle.sub()}`);
     response.end();
  }
  else if (request.url==='/about') {
      response.writeHead(200, { 'Content-Type': 'text/html',
          'Trailer': 'Content-MD5' });
     response.write(about);
     response.end();
  }else if (request.url ==='/contact'){
      response.writeHead(200, { 'Content-Type': 'text/html',
          'Trailer': 'Content-MD5' });
     response.write(contact);
     response.end();
  }else {
      response.writeHead(404, { 'Content-Type': 'text/html',
          'Trailer': 'Content-MD5' });
     response.write('Error 404 Page not Found');
     response.end();
  }
});

server.listen(3000, (res)=> {
    console.log("App Running at port 3000");
});