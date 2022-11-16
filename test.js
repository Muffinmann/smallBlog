const fs = require('fs/promises');
const https = require('https')
const url = require('url')

const options = {
  // hostname: '127.0.0.1',
  // port: 3000,
  hostname: 'https://www.youtube.com/cde89ba4-6553-44ee-a3d5-83d72c2e3a81',
  method: 'GET',
  headers: {
    accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
  }
};

let body = []
const req = https.request(options, (res) => {
  console.log('statusCode:', res.statusCode);
  console.log('headers:', res.headers);
  // console.log(res)
  res.on('data', (chunk) => {
    body.push(chunk)
  });
  res.on('end', () => {
    console.log('stream ends')
    body = Buffer.concat(body).toString()
    // fs.rm('body.txt')
    
    fs.writeFile('body.html', body)
  })
});

req.on('error', (e) => {
  console.error(e);
});
req.end();