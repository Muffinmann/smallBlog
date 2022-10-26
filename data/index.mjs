import sqlite3 from 'sqlite3'

const db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory Sqlite database.')
})

// db.close((err) => {
//   if (err) {
//     return console.error(err.message)
//   }
//   console.log('Closed db successfully.')
// })
const getBlogs = (cb) => {
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS blogs (
        blog_id INTERGER PRIMARY KEY not null,
        blog_title TEXT not null,
        blog_created_at TEXT not null,
        blog_content TEXT not null
      )
    `, (err) => {
      if (err) console.log('create blogs =>', err)
    })
    .run(`
        insert into blogs (blog_id, blog_title, blog_created_at, blog_content)
        values (1, 'title 1', '2022-10-23', 'test paragraph'),
               (2, 'title 2', '2022-10-24', 'test paragraph second')
    `, (err) => {
      if (err) console.log('insert blogs =>', err)
    })
    .run(`
      CREATE TABLE IF NOT EXISTS categories (
        category_id INT PROMARY KEY not null,
        category_name text not null
      )
    `, (err) => {
      if (err) console.log('create categories =>', err)
    })
    .run(`
    insert into categories (category_id, category_name)
        values (1, 'tag 1'),
               (2, 'tag 2')
    `)
    .run(`
      CREATE TABLE IF NOT EXISTS blog_categories (
        blog_id interger,
        category_id interger,
        PRIMARY KEY (blog_id, category_id)
        FOREIGN KEY (blog_id)
          REFERENCES blogs (blog_id)
            ON UPDATE CASCADE
            ON DELETE CASCADE
        FOREIGN KEY (category_id)
          REFERENCES categories (category_id)
            ON UPDATE CASCADE
            ON DELETE CASCADE
      )
    `)
    .run(`
        INSERT INTO blog_categories (blog_id, category_id)
          values (1, 1), (2, 2)
    `)
    .all(`SELECT * FROM blog_categories
    INNER JOIN blogs ON blog_categories.blog_id=blogs.blog_id
    INNER JOIN categories ON blog_categories.category_id=categories.category_id
  `, (err, rows) => {
      if (err) {
        return console.error('select error: ', err.message)
      }
      cb(rows)
      db.close()
    })
  })
}

export default getBlogs;

