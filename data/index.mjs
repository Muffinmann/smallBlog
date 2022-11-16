import sqlite3 from 'sqlite3';

const createBlog = (db, { blogTitle, blogContent}) => {
  db.run(String.raw `INSERT INTO blogs (
      blog_title,
      blog_content,
      blog_created_at,
      blog_modified_at,
      blog_viewed_times
    ) VALUES (
      "${blogTitle}",
      "${blogContent}",
      datetime('now'),
      datetime('now'),
      0
    )`, (err) => console.error('create blog: ' + err)
  );
};

const createBlogsTable = (db, next) => {
  db.run(`
    CREATE TABLE IF NOT EXISTS blogs (
      blog_id INTEGER PRIMARY KEY NOT NULL,
      blog_title TEXT NOT NULL,
      blog_content TEXT NOT NULL,
      blog_created_at TEXT NOT NULL,
      blog_modified_at TEXT NOT NULL,
      blog_viewed_times INTEGER NOT NULL DEFAULT 0
    )
  `, () => next && next());
};

const createCategoriesTable = (db, next) => {
  db.run(`
  CREATE TABLE IF NOT EXISTS blog_categories (
    blog_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    PRIMARY KEY (blog_id, category_id),
    FOREIGN KEY (blog_id)
      REFERENCES blogs (blog_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY (category_id)
      REFERENCES categories (category_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
  );
  `, () => next && next());
};

const createBlogCategoriesTable = (db, next) => {
  db.run(`
  CREATE TABLE IF NOT EXISTS categories (
    category_id INT PRIMARY KEY NOT NULL,
    category_name TEXT NOT NULL
  );
  `, () => next && next());
};

const createTables = (db) => {
  db.parallelize(() => {
    createBlogsTable(db, () => createBlog(db, {
      blogId: 1,
      blogTitle: 'first blog',
      blogContent: String.raw `I'am a test blog with very short content`,
    }));
    createCategoriesTable(db);
    createBlogCategoriesTable(db);
  });
};

const createDb = () => {
  const newDb = new sqlite3.Database('data/smallBlog.db', (err) => {
    if (err) {
      console.err('connecting db failed' + err);
    }
    createTables(newDb);
  });
};

const db = new sqlite3.Database('./data/smallBlog.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    createDb();
    return console.error(err.message);
  }
  console.log('Connected to the Sqlite database.');
});


// db.close((err) => {
//   if (err) {
//     return console.error(err.message)
//   }
//   console.log('Closed db successfully.')
// })
export const getBlogs = (cb) => {
  console.log('getting blogs...');
  db.all(`SELECT blog_id, blog_title FROM blogs`, (err, rows) => {
    if (err) {
      return console.error('select error: ', err.message);
    }
    console.log('rows = ', rows);
    cb(rows);
    // db.close()
  });
  // db.serialize(() => {
  // });
};

export const getBlog = (id, cb) => {
  db.get(`SELECT * FROM blogs WHERE blog_id = ?`, id, (err, row) => {
    if (err) {
      return console.error('get blog error' + err.message);
    }
    cb(row);
  });
};

// const dropTables = (db) => {
//   db.run(`
//     DROP TABLE IF EXISTS blogs
//   `, (e, row) => console.log('drop tables : ', e, row));
// };
// createBlog(db, {
//   blogTitle: 'a test blog contains HTML tags',
//   blogContent: String.raw `this blog is a test blog which contains HTML tag, for example,
//     the following text is wrapped by a &lt;p&gt; tag, which should start a new line:
//     <p>I'am the text living in a pair of p tag </p>
//     and the content after it starts a new line as well
//   `
// });

// getBlogs((d) => console.log('blogs = ', d));
// dropTables(db);
// db.close();
export default getBlogs;

