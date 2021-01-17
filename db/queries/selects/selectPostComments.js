const selectPostComments = async (db, options={postId: 0}) => {
  try {
    const comments = await db.query(`
      SELECT comments.*, TO_CHAR(comments.date, 'MM, DD, YYYY') as formattedDate, users.username, users.avatar FROM comments
      FULL OUTER JOIN users ON users.id = user_id
      WHERE post_id = $1
      ORDER BY date DESC;
    `,[options.postId])

    return comments
  }
  catch(err) {
    console.log(err)
    return err
  }
}

module.exports = selectPostComments;