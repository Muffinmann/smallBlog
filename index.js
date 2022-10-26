console.log('import successfully')
const dataRequest = new Request('/api/data/blogs')

fetch(dataRequest)
.then((data) => data.json())
.then((dJson) => {
  console.log('fetched data:', dJson)
  const root = document.getElementById('root')
  dJson.forEach((blog) => {
    console.log('process blog: ', blog)
    const title = document.createElement('h2')
    title.textContent = blog.blog_title;
    root.appendChild(title)
  })

  const tag = document.getElementById('blog-tags')
  const a = document.createElement('a')
  a.textContent = 'remote tag'
  a.setAttribute('class', 'tag')
  a.setAttribute('href', '/')
  tag.appendChild(a)

  const txt = document.createTextNode('txt tag')
  
  tag.append(txt)
})