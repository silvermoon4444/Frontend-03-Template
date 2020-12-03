const http = require("http");

http.createServer(function (req, res) {
  console.log(req.headers);
  req.on('data',chunk=>{
    console.log(chunk.toString());
  })
  req.on('end',chunk=>{
    console.log('Success');
  })
}).listen(8082);
