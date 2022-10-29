import { renderBlog } from './views/blog.mjs';

const dataRequest = new Request('/api/data/blogs');


fetch(dataRequest)
  .then((data) => data.json(), (err) => console.error('fetch error' + err))
  .then((dJson) => {
    console.log('fetched data:', dJson);
    const root = document.getElementById('root');
    dJson.forEach((blog) => {
      const blogView = renderBlog({blogTitle: blog.blog_title, blogContent: blog.blog_content});
      root.appendChild(blogView);
    });

    // const tag = document.getElementById('blog-tags');
    // const a = document.createElement('a');
    // a.textContent = 'remote tag';
    // a.setAttribute('class', 'tag');
    // a.setAttribute('href', '/');
    // tag.appendChild(a);

    // const txt = document.createTextNode('txt tag');
  
    // tag.append(txt);
  });