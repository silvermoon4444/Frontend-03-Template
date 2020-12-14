const http = require("http");
const fs = require("fs");
const archiver = require("archiver");

// fs.stat("./index.html", (err, stat) => {
//   let request = http.request(
//     {
//       hostname: "127.0.0.1",
//       port: 8082,
//       method: "post",
//       headers: {
//         "Content-Type": "application/octet-stream",
//         // "Content-Length": stat.size,
//       },
//     },
//     (res) => {
//       console.log(res);
//     }
//   );
//   const archive = archiver('zip', {
//     zlib: { level: 9 } // Sets the compression level.
//   });

//   let file = fs.createReadStream("./index/");
//   archive.pipe(file);

//   // file.on("data", (chunk) => {
//   //   console.log(chunk.toString());
//   //   request.write(chunk)
//   // });
//   // file.on("end", () => request.end());
// });
let request = http.request(
  {
    hostname: "127.0.0.1",
    port: 8082,
    method: "post",
    headers: {
      "Content-Type": "application/octet-stream",
      // "Content-Length": stat.size,
    },
  },
  (res) => {
    console.log(res);
  }
);
const archive = archiver("zip", {
  zlib: { level: 9 }, // Sets the compression level.
});

// let file = fs.createReadStream("./index/");

archive.directory('./index/',false)
archive.finalize()
archive.pipe(request);

// file.on("data", (chunk) => {
//   console.log(chunk.toString());
//   request.write(chunk)
// });
// file.on("end", () => request.end());
