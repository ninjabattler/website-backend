const db = require('../db/db');
const { selectArticleMetadata } = require('../db/queries')

const metaData = (req, res, next) => {
  const splitReview = req.params.review.split('_')
  let formattedReview = '';
  splitReview.forEach((review) => {
    formattedReview += review + " "
  })

  formattedReview = formattedReview.slice(0, -1);
  
  selectArticleMetadata(db, {title: formattedReview})
  .then((res) => {
    req.args = { meta: res.rows[0] }
    next();
  })

}

module.exports = metaData