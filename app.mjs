import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const hostname = '127.0.0.1';
const port = 3000;

const getFilePath = (name) => path.join('/', __dirname, name);

const server = http.createServer((req, res) => {
  console.log('req:', req.method, ' for', req.url);
  if (req.url === '/' && req.method === 'GET') {
    fs.readFile(getFilePath('index.html'), (err, data) => {
      if (err) {
        console.log(err)
      }
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.end(data);
    })
  }
  else if (req.url === '/blogs' && req.method === 'GET') {
    fs.readFile(getFilePath('blogs.html'), (err, data) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.end(data);
    })
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
