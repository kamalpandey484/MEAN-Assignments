var fs=require('fs');


let readStream=fs.createReadStream('./read.txt');

let writeStream=fs.createWriteStream('./write.txt');

function pipeExample(){
    readStream.pipe(writeStream);

}

module.exports={
    pipeExample

};