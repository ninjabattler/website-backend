const insertNewLike = async (db, options = { liked: true, userId: 0, postId: 0 }) => {
  try {
    const deletedLike = await db.query(`
      DELETE FROM likes
      WHERE user_id = $1 AND post_id = $2
      RETURNING ${'*'};
    `, [options.userId, options.postId]);

    if (deletedLike.rows[0]) {
      if (deletedLike.rows[0].liked === options.liked) {
        const newLike = await db.query(`
          INSERT INTO likes(liked, user_id, post_id)
          VALUES($1, $2, $3)
          RETURNING ${'*'};
        `, [options.liked, options.userId, options.postId])

        return newLike
      } else {
        return {rows: []}
      }
    } else {
      const newLike = await db.query(`
        INSERT INTO likes(liked, user_id, post_id)
        VALUES($1, $2, $3)
        RETURNING ${'*'};
      `, [options.liked, options.userId, options.postId])

      return newLike
    }
  }
  catch (err) {
    console.log(err)
    return err
  }
}

module.exports = insertNewLike;