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
        res.end(`<html lang="en">
        <head>
            <meta charset="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Document</title>
        </head>
        <body>
            
        </body>
        </html>`);
    });
}).listen(8088);


console.log('server started');
