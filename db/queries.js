const createDb = require('./queries/createDb');
const selectSinglePost = require('./queries/selects/selectSinglePost');
const selectAllPosts = require('./queries/selects/selectAllPosts');
const selectUserLike = require('./queries/selects/selectUserLike');
const insertNewPost = require('./queries/inserts/insertNewPost');
const insertNewLike = require('./queries/inserts/insertNewLike');
const findCreateUser = require('./queries/findCreateUser');

module.exports = {
  createDb,
  selectSinglePost,
  selectAllPosts,
  selectUserLike,
  insertNewPost,
  insertNewLike,
  findCreateUser
}