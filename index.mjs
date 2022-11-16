import { renderBlog } from './views/blog.mjs';

const dataRequest = new Request('api/data/blogs');


fetch(dataRequest)
  .then((data) => data.json(), (err) => console.error('fetch error' + err))
  .then((dJson) => {
    console.log('fetched data:', dJson);
    const main = document.querySelector('main');
    const loader = document.querySelector('.loader');
    const bList = document.createElement('ul');

    dJson.forEach((blog) => {
      const listItem = document.createElement('li');
      const link = document.createElement('a');
      link.setAttribute('href', `blogs/${blog.blog_id}`);
      const txtNode = document.createTextNode(blog.blog_title);

      link.appendChild(txtNode);
      listItem.appendChild(link);
      bList.appendChild(listItem);
    });

    main.appendChild(bList);
    main.removeChild(loader);
  });