const express = require('express');
const queries = require('../db/queries');
const router = express.Router();
const cors = require('cors');
const headers = require('../middleware/headersMiddleware');
const metaData = require('../middleware/metaDataMiddleware');

module.exports = (database) => {

  router.use(cors())

  router.get('/', async (req, res) => {
    const posts = await queries.selectAllPosts(database)

    for(const row of posts.rows) {
      const comments = await queries.selectPostComments(database, {postId: row.id})

      row.comments = comments.rows
    }

    res.send(posts)
  })

  router.get('/articles', async (req, res) => {
    const articles = await queries.selectAllArticles(database)

    res.send(articles)
  })

  router.get('/comments', async (req, res) => {
    const posts = await queries.selectPostComments(database, {postId: req.query.postId})

    res.send(posts)
  })

  router.get('/:review', metaData, async (req, res) => {

    const splitReview = req.params.review.split('_')
    let formattedReview = '';
    splitReview.forEach((review) => {
      formattedReview += review + " "
    })

    formattedReview = formattedReview.slice(0, -1);
    const post = await queries.selectSinglePost(database, {title: formattedReview})
    res.send({
      meta: req.args.meta,
      post: post
    })
  })

  return router;

}