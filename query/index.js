const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get("/post", (req, res) => {
    res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  if (type === "PostCreated") {
    console.log("PostCreated");
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, postId } = data;
    console.log("CommentCreated");
    // const comments = post[postId].comments
    // comments.push({id: id, content})
    // postId[postId] = comments;

    const post = posts[postId];
    post.comments.push({ id, content });
  }

  res.send({})
});

app.listen(4002, () => {
  console.log("Listen on 4002");
});
