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
        res.end(`<li class="li_frist">
        <div>
            <p><a href="javascript:void(0)" title="热点信息">
                    <font color="#ffffff" style="font-size:18px;"><b>热点信息</b></font>
                </a></p>
        </div>
    </li>`);
    });
}).listen(8088);


console.log('server started');
