const selectUserLike = async (db, options={userId: 0, postId: 0}) => {
  try {
    const like = await db.query(`
      SELECT * FROM likes
      WHERE user_id = $1 AND post_id = $2;
    `, [options.userId, options.postId])

    return like
  }
  catch(err) {
    console.log(err)
    return err
  }
}

module.exports = selectUserLike;