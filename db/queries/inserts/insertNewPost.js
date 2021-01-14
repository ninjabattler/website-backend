const insertNewPost = async (db, options={title: null, colour: null, category: null, genre: null, thumbnail: null, review: null, content: null, video_header}) => {
  try {
    const newPost = await db.query(`
      INSERT INTO posts(title, colour, category, genre, content, thumbnail, review, video_header)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING ${'*'};
    `, [options.title, options.colour, options.category, options.genre, options.content, options.thumbnail, options.review, options.video_header])

    return newPost
  }
  catch(err) {
    console.log(err)
    return err
  }
}

module.exports = insertNewPost;