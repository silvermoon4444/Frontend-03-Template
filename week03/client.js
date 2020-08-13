const Net = require("net");
const parser = require('./parser')


class Request {
  constructor(option) {
    this.host = option.host || "127.0.0.1";
    this.port = option.port || 80;
    this.method = option.method || "GET";
    this.body = option.body || {};
    this.headers = option.headers || {};
    this.path = option.path || "/";
    if (!this.headers["Content-Type"]) {
      this.headers["Content-Type"] = "application/x-www-form-urlencoded";
    }
    if (this.headers["Content-Type"] === "application/json") {
      this.bodyText = JSON.stringify(this.body);
    } else if (
      this.headers["Content-Type"] === "application/x-www-form-urlencoded"
    ) {
      this.bodyText = Object.keys(this.body)
        .map((key) => `${key}=${encodeURIComponent(this.body[key])}`)
        .join("&");
    }
    this.headers["Content-Length"] = this.bodyText.length;
  }
  toString() {
    return `${this.method} ${this.path} HTTP/1.1\r
${Object.keys(this.headers)
        .map((key) => `${key}: ${this.headers[key]}`)
        .join("\r\n")}\r
\r
${this.bodyText}`;
  }
  send(client) {
    return new Promise((resolve, reject) => {
      let pareser = new ResponseParse();
      if (client) {
        client.write(this.toString());
      } else {
        client = Net.createConnection(
          { host: this.host, port: 8088 },
          () => {
            client.write(this.toString());
          }
        );
        client.on("data", (data) => {
          // console.log(data.toString());
          pareser.receive(data.toString());
          if (pareser.isFinished) {
            resolve(pareser.respose)
            client.end();
          }
        });
        client.on("error", (error) => {
          console.error('error', error);
          reject(error)
          client.end()
        });
      }
    });
  }
}

//!Reponse Body为chunk类型
class ResponseParse {
  constructor() {
    this.RESPONSE_LINE = 0
    this.RESPONSE_LINE_END = 1
    this.RESPONSE_HEADER_KEY = 2
    this.RESPONSE_HEADER_VALUE = 3
    this.RESPONSE_HEADER_SPACE = 4
    this.RESPONSE_HEADER_END = 5
    this.RESPONSE_BODY = 6

    this.current = this.RESPONSE_LINE
    this.line = ''
    this.headers = {}
    this.body = null

    this.headersKey = ''
    this.headersVal = ''
  }
  get isFinished() {
    if (this.body) {
      return this.body.isFinished
    } else {
      return false
    }
  }
  get respose() {
    this.line.match(/HTTP\/1.1 ([0-9]+) ([\s\S]+)/)
    return {
      statusCode: RegExp.$1,
      statusText: RegExp.$2,
      headers: this.headers,
      body: this.body.content.join('')
    }
  }
  receive(str) {
    for (let i = 0; i < str.length; i++) {
      this.receiveChar(str.charAt(i));
    }
  }
  receiveChar(char) {
    if (this.current === this.RESPONSE_LINE) {
      if (char === '\r') {
        this.current = this.RESPONSE_LINE_END
      } else {
        this.line += char
      }
    }
    else if (this.current === this.RESPONSE_LINE_END) {
      if (char === '\n') {
        this.current = this.RESPONSE_HEADER_KEY
      }
    }
    else if (this.current === this.RESPONSE_HEADER_KEY) {
      if (char === '\n') {
        this.current = this.RESPONSE_BODY
      }
      else if (char === ':') {
        this.current = this.RESPONSE_HEADER_SPACE
      }
      else {
        this.headersKey += char
      }
    }
    else if (this.current === this.RESPONSE_HEADER_SPACE) {
      if (char === ' ') {
        this.current = this.RESPONSE_HEADER_VALUE
      }
    }
    else if (this.current === this.RESPONSE_HEADER_VALUE) {
      if (char === '\r') {
        // this.headersVal=this.headersVal.replace(/\r/g,'')
        this.headers[this.headersKey] = this.headersVal
        this.headersKey = ''
        this.headersVal = ''
        this.current = this.RESPONSE_HEADER_END
      }
      else {
        this.headersVal += char
      }
    }
    else if (this.current === this.RESPONSE_HEADER_END) {
      if (char = '\n') {
        this.current = this.RESPONSE_HEADER_KEY
        this.body = new BodyParser()

      }
    }
    else if (this.current === this.RESPONSE_BODY) {
      this.body.receiveChar(char)
    }
  }
}

class BodyParser {
  constructor() {
    this.LENGTH_WAIT = 0;
    this.LENGTH_END = 1
    this.CONTENT_WAIT = 2
    this.CONTENT = 3
    this.CONTENT_END = 4
    this.isFinished = false

    this.current = this.LENGTH_WAIT
    this.length = 0
    this.content = []
  }
  receiveChar(char) {
    if (this.current === this.LENGTH_WAIT) {
      if (char === '\r') {
        if (this.length === 0) {
          this.isFinished = true
        } else {
          this.current = this.LENGTH_END
        }
      }
      else {
        this.length *= 16
        this.length += parseInt(char, 16)
      }
    }
    else if (this.current === this.LENGTH_END) {
      if (char === '\n') {
        this.current = this.CONTENT_WAIT;
      }
    }
    else if (this.current === this.CONTENT_WAIT) {
      if (this.length === 0) {
        this.current = this.CONTENT
      } else {
        this.content.push(char)
        this.length--;
      }
    }
    else if (this.current === this.CONTENT) {
      if (char = '\r') {
        this.current = this.CONTENT_END
      }
    }
    else if (this.current === this.CONTENT_END) {
      if (char = '\n') {
        this.current = this.LENGTH_WAIT
      }
    }
  }

}

void (async function () {
  let request = new Request({
    host: "127.0.0.1",
    port: "8088",
    method: "POST",
    ContetnType: "application/x-urldecoder-www",
    headers: {
      ["X-Foo2"]: "customed",
    },
    body: {
      info: "hello word",
    },
  });
  let respose = await request.send();
  parser.parseHTML(respose.body)
  // console.log('✨respose\n', respose);
})();
