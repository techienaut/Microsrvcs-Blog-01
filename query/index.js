const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};
// EXAMPLE
// posts = {
//   'j123j42': {
//     id: "j123j42",
//     title: "post title",
//     comments: [{ id: "klj3kl", content: "Yolo!" }],
//   },
// };

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  if (type === "PostCreated") {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, postId } = data;

    const post = posts[postId];
    post.comments.push({ id, content });
  }

  console.log("Posts", posts);
  res.send({});
});

app.listen(4002, () => {
  console.log("Listening on 4002");
});
