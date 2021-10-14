const createDb = require('./queries/createDb');
const selectSinglePost = require('./queries/selects/selectSinglePost');
const selectAllPosts = require('./queries/selects/selectAllPosts');
const selectAllArticles = require('./queries/selects/selectAllArticles');
const selectUserLike = require('./queries/selects/selectUserLike');
const selectPostComments = require('./queries/selects/selectPostComments');
const selectArticleMetadata = require('./queries/selects/selectArticleMetadata');
const insertNewPost = require('./queries/inserts/insertNewPost');
const insertNewLike = require('./queries/inserts/insertNewLike');
const insertNewComment = require('./queries/inserts/insertNewComment');
const findCreateUser = require('./queries/findCreateUser');

module.exports = {
  createDb,
  selectSinglePost,
  selectAllPosts,
  selectAllArticles,
  selectUserLike,
  selectPostComments,
  selectArticleMetadata,
  insertNewPost,
  insertNewLike,
  insertNewComment,
  findCreateUser
}