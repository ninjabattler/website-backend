const selectArticleMetadata = async (db, options={title: '', id: 0}) => {
  try {
    const post = await db.query(`
      SELECT title, thumbnail, colour, genre, category FROM posts
      WHERE lower(title) = $1 OR id = $2;
    `, [options.title, options.id])

    return post
  }
  catch(err) {
    console.log(err)
    return err
  }
}

module.exports = selectArticleMetadata;