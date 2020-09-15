const http = require("http");

http.createServer((req, res) => {
  let body = [];
  req
    .on("error", (err) => {
      console.log(err);
    })
    .on("data", (chunk) => {
      body.push(chunk);//!直接传chunk
    }).on('end',()=>{
        body=Buffer.concat(body).toString();
        console.log('body',body);
        res.writeHead(200,{'Content-Type':'text-html'});
        res.end('12345678901234567890');
    });
}).listen(8088);


console.log('server started');