export const renderBlog = ({blogTitle, blogContent}) => {
  const container = document.createElement('div');

  const title = document.createElement('h2');
  title.textContent = blogTitle;
  container.appendChild(title);

  console.log('process blog content: ', blogContent);
  const content = document.createElement('div');
  content.setAttribute('rows', 10);
  content.setAttribute('style', 'width: 100%;');
  content.innerHTML = blogContent;
  container.appendChild(content);

  return container;
};

