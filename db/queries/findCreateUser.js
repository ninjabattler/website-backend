const { encrypt } = require('../../helpers/encryptHelper');
const findCreateUser = async (db, options = { ip: '' }) => {
  try {
    const user = await db.query(`
      SELECT * FROM users
      WHERE ip = $1;
    `, [options.ip])

    if (user.rows.length === 0) {
      const newUser = await db.query(`
        INSERT INTO users(ip, username, avatar)
        VALUES($1, $2, '')
        RETURNING ${'*'};
      `, [options.ip, encrypt(options.ip)])

      return newUser;
    } else {
      return user
    }
  }
  catch (err) {
    console.log(err)
    return err
  }
}

module.exports = findCreateUser;