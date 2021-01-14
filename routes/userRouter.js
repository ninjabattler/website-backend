const express = require('express');
const queries = require('../db/queries');
const { encrypt, decrypt } = require('../helpers/encryptHelper');
const router = express.Router();
const cors = require('cors');

module.exports = (database) => {

  router.use(cors())

  router.get('/like', async (req, res) => {
    const user = await queries.findCreateUser(database, {ip: req.query.ip})
    const like = await queries.insertNewLike(database, {liked: req.query.like, userId: user.rows[0].id, postId: req.query.postId})

    res.send(like.rows[0])
  })

  router.get('/liked', async (req, res) => {
    const user = await queries.findCreateUser(database, {ip: req.query.ip})
    const like = await queries.selectUserLike(database, {userId: user.rows[0].id, postId: req.query.postId})
    res.send(like.rows[0])
  })

  return router;

}