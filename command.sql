CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author TEXT,
  url TEXT NOT NULL,
  title TEXT NOT NULL,
  likes INTEGER DEFAULT 0
);

INSERT INTO blogs (author, url, title, likes) VALUES
  ('Haseeb', 'https://example.com/post1', 'Learning Sequelize', 5),
  ('Beta', 'https://example.com/post2', 'Docker with Postgres', 10);
