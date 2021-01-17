const express = require('express');
const queries = require('../db/queries');
const router = express.Router();
const cors = require('cors');

module.exports = (database) => {

  router.use(cors())

  router.get('/', async (req, res) => {
    const posts = await queries.selectAllPosts(database)

    res.send(posts)
  })

  router.get('/comments', async (req, res) => {
    const posts = await queries.selectPostComments(database, {postId: req.query.postId})

    res.send(posts)
  })

  router.get('/:review', async (req, res) => {

    const splitReview = req.params.review.split('_')
    let formattedReview = '';
    splitReview.forEach((review) => {
      formattedReview += review + " "
    })

    formattedReview = formattedReview.slice(0, -1);
    const post = await queries.selectSinglePost(database, {title: formattedReview})
    res.send(post)
  })

  return router;

}