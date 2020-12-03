const http = require("http");
const fs = require("fs");

let request = http.request(
  {
    hostname: "127.0.0.1",
    port: 8082,
    method: "post",
    headers: { "Content-Type": "application/octet-stream" },
  },
  (res) => {
    console.log(res);
  }
);

let file = fs.createReadStream("./package.json");

file.on("data", (chunk) => {
  console.log(chunk.toString());
  request.write(chunk)
});
file.on('end',chunk=>{
  console.log('read finished',);
  request.end(chunk)
})
