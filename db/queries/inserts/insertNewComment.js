const insertNewComment = async (db, options={content: '', postId: 0, userId: 0}) => {
  try {
    const newComment = await db.query(`
      INSERT INTO comments(content, post_id, user_id)
      VALUES($1, $2, $3)
      RETURNING ${'*'};
    `, [options.content, options.postId, options.userId])

    return newComment
  }
  catch(err) {
    console.log(err)
    return err
  }
}

module.exports = insertNewComment;