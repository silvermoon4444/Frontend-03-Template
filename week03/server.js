const http = require("http");

http.createServer((req, res) => {
  let body = [];
  req
    .on("error", (err) => {
      console.log(err);
    })
    .on("data", (chunk) => {
      body.push(chunk);//!直接传chunk
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      console.log('body', body);
      res.writeHead(200, { 'Content-Type': 'text-html' });
      res.end(`<html lang="en">
      <head>
          <meta charset="UTF-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <title>Document</title>
          <style>
              body #box{
                  width: 100px;
                  height: 100px;
                  background-color: aqua;
              }
              body #img{
                  width: 500px;
                  height: 500px;
              }
          </style>
      </head>
      <body>
          <div id='box'></div>1
          <img src="src111"/>2
      </body>
      </html>`);
    });
}).listen(8088);


console.log('server started');
