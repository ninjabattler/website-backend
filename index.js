const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db/db');
const queries = require('./db/queries');
const postRoutes = require('./routes/postRouter');
const userRoutes = require('./routes/userRouter');
const path = require('path');

app.use(express.static(path.join(__dirname, 'build')))

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, 'build'));
});
app.get("/about", function (req, res) {
  res.redirect('https://www.youtube.com/watch/dQw4w9WgXcQ')
});

db.connect()
.then(()=>{
  console.log('YO')
})
.catch((err) => {
  console.log(err)
})
app.use('/postData', postRoutes(db));
app.use('/users', userRoutes(db));

app.use(cors())

app.listen(5000, () => {
  console.log("server has started on port 5000");
})