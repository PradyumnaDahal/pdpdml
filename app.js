const http = require("http");
const jsonBlob = require("./jsonBlob.js");
const fs = require("fs");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  console.log(req.url);
  if (["/", "/index.html", "/index"].includes(req.url)) {
    var indexHTML = fs.readFileSync("./index.html", "utf8");
    res.writeHeader(200, { "Content-Type": "text/html" });
    res.write(indexHTML);
    res.end();
  } else if (req.url == "/favicon.ico") {
    var ico = fs.readFileSync("./favicon.ico");
    res.end(ico);
  } else {
    main(req, res);
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
async function main(req, res) {
  const dataBase = await jsonBlob.getJson(
    "https://jsonblob.com/api/c9561dcf-e55f-11eb-931c-dde3749148b3"
  );
  console.log("2", req.url);
  if (dataBase[req.url]) {
      console.log(dataBase[req.url].url)
    res.writeHead(303, {
      Location: dataBase[req.url].url,
    });
    res.end();
  } else {
    var indexHTML = fs.readFileSync("./404.html", "utf8");
    res.writeHeader(200, { "Content-Type": "text/html" });
    res.write(indexHTML);
    res.end();
  }
}
