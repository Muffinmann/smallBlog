import { getBlogs, getBlog } from '../../data/index.mjs';

router.use('/api/data/blogs', (req, res) => {
  getBlogs((data) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
  });
});
export default function handler(req, res) {
  getBlogs((data) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
  });
}