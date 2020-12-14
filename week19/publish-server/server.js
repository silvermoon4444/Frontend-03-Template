const http = require("http");
const fs = require("fs");
const unzipper=require('unzipper')

http
  .createServer(function (req, res) {
    console.log(req.headers);
    // let file = fs.createWriteStream("../server/public/index.html");
    // req.on('data',chunk=>{
    //   console.log(chunk.toString());
    //   file.write(chunk)
    // })
    req.pipe(unzipper.Extract({ path: '../server/public' }));
    // req.on("end", (chunk) => {
    //   file.end();
    //   console.log("Success");
    // });
  })
  .listen(8082);
