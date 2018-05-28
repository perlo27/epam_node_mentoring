const http = require('http');
const { readFileSync, createReadStream } = require('fs');
const path = require('path');
const queryString = require('query-string');
const through2 = require('through2');

const htmlPath = path.join(__dirname, 'index.html');

// To run with stream use --usestream flag
const server = http.createServer((req, res) => {
  const {
    query: { message = '' },
  } = queryString.parseUrl(req.url);
  res.setHeader('Content-Type', 'text/html');
  if (process.argv[2] === '--usestream') {
    const transformer = through2(function(chunk, enc, callback) {
      this.push(chunk.toString().replace(/\{message\}/, message));
      callback();
    });
    createReadStream(htmlPath)
      .pipe(transformer)
      .pipe(res);
  } else {
    let fileText = readFileSync(htmlPath);
    res.end(fileText.toString().replace(/\{message\}/, message));
  }
});

server.listen(8000, () => console.log('listening on port 8000'));
