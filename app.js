const express = require("express");
const config = require("./config")
const placeholderApi = require("./jsonplaceholder");

const app = express();
const port = config.app.port;

// This is for returning formatted json
 app.set("json spaces", 2);


app.get("/:userId", async (req, res) => {

  userId = req.params.userId;
  posts = await placeholderApi.getPostsWithCommentsForUserId(userId);

  if (posts.length > 0) {
    res.send(posts);
  }
  else {
    res.status(404).send(`No post found for user ${userId}`);
  }
});


app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
