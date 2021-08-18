const createDb = async (db) => {
  try {
    await db.query(`
      DROP TABLE IF EXISTS post;
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS comments;
      DROP TABLE IF EXISTS likes;

      CREATE TABLE posts (
        id SERIAL PRIMARY KEY NOT NULL,
        title VARCHAR(255),
        thumbnail VARCHAR(255),
        video_header VARCHAR(255),
        date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        review BOOL NOT NULL DEFAULT false,
        colour VARCHAR(255),
        content TEXT,
        category VARCHAR(255),
        genre VARCHAR(255),
        narration VARCHAR(255)
      );

      CREATE TABLE users (
        id SERIAL PRIMARY KEY NOT NULL,
        username VARCHAR(255) NOT NULL,
        avatar VARCHAR(255) NOT NULL,
        ip VARCHAR(50),
        date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE comments (
        id SERIAL PRIMARY KEY NOT NULL,
        content VARCHAR(255) NOT NULL,
        date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        post_id INTEGER REFERENCES posts(id),
        user_id INTEGER REFERENCES users(id),
        comment_id INTEGER REFERENCES comments(id)
      );

      CREATE TABLE likes (
        id SERIAL PRIMARY KEY NOT NULL,
        liked BOOL NOT NULL,
        post_id INTEGER REFERENCES posts(id),
        user_id INTEGER REFERENCES users(id)
      );
    `)

    return true
  }
  catch(err) {
    console.log(err)
    return err
  }
}

module.exports = createDb;