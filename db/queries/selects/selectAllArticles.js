const selectAllPosts = async (db) => {
  try {
    const posts = await db.query(`
      SELECT *, TO_CHAR(date, 'MM, DD, YYYY') as formattedDate FROM posts
      WHERE review = true
      ORDER BY date DESC;
    `)

    return posts
  }
  catch(err) {
    console.log(err)
    return err
  }
}

module.exports = selectAllPosts;