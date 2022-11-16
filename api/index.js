const http = require('http');
const fs = require('fs');
const path = require('path');
const { fileURLToPath } = require('url');
const { getBlogs, getBlog } = require('../data/index.mjs');
const Router = require('../scripts/router/index.mjs');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const hostname = '127.0.0.1';
const port = 3000;

const getFilePath = (name) => path.join('/', __dirname, name);

const router = new Router();

router.use('/', (req, res) => {
  fs.readFile(getFilePath('index.html'), (err, data) => {
    if (err) {
      console.log(err);
    }
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(data);
  });
});

router.use('/api/data/blogs', (req, res) => {
  getBlogs((data) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
  });
});

router.use('/blogs/:id', (req, res) => {
  console.log('req param = ', req.param);
  fs.readFile('views/template.html', (err, template) => {
    if (err) {
      console.error('read blog.html:', err);
      return;
    }

    fs.readFile('views/blog.html', (err, blog) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      // res.end(blog.blog_title);
      const result = String(template.toString());
      console.log('raw = ',result.indexOf('{blog_content}'));
      const b = String(blog.toString());
      const combined = result.replace('{blog_content}', b);
      // console.log({result, b})
      res.end(combined);
    });
  });
});

router.use('/styles.css', (req, res) => {
  fs.readFile(getFilePath('styles.css'), (err, data) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/css');
    res.end(data);
  });
});

router.use('/index.mjs', (req, res) => {
  fs.readFile(getFilePath('index.mjs'), (err, data) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/javascript');
    res.end(data);
  });
});

router.use('/views/blog.mjs', (req, res) => {
  fs.readFile(getFilePath('/views/blog.mjs'), (err, data) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/javascript');
    res.end(data);
  });
});

const server = http.createServer((req, res) => {
  console.log('req:', req.method, ' for', req.url);
  console.log('from: ', req.socket.remoteAddress);
  console.log(req.headers);
  router.handle(req, res);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// const app = require('express')();
// const { v4 } = require('uuid');
// const fs = require('fs');

// const getFilePath = (name) => path.join('/', __dirname, name);

// app.get('/', (req, res) => {
//   fs.readFile(path.join('/', __dirname, '..', 'index.html'), (err, data) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/html');
//     res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
//     res.end(data);
//   })
// });

// app.get('/api', (req, res) => {
//   const path = `/api/item/${v4()}`;
//   res.setHeader('Content-Type', 'text/html');
//   res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
//   res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
// });

// app.get('/api/item/:slug', (req, res) => {
//   const { slug } = req.params;
//   res.end(`Item: ${slug}`);
// });

// module.exports = app;
