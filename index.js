import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";

const app = express();
const port = 3000;
let posts = [];

function create(req, res, next) {
  let newPost = req.body['new'];

  let allPost = {
    id: posts.length + 1,
    todo: newPost,
  };

  posts.push(allPost);
  next();
}

function deletePost(req, res, next) {
  const postId = parseInt(req.params.id);
  const indexToDelete = posts.findIndex(post => post.id === postId);

  if (indexToDelete !== -1) {
    posts.splice(indexToDelete, 1);

    // Update post IDs
    posts.forEach((post, index) => {
      post.id = index + 1;
    });
  }

  next();
}

function updatePost(req, res, next) {
  const postId = parseInt(req.params.id);
  const index = posts.findIndex(post => post.id === postId);

  if (index !== -1) {
    posts[index].todo = req.body.editedTodo;
  }

  next();
}

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));



app.get("/", (req, res) => {
  res.render("index.ejs", { posts: posts });
});

app.post("/submit", create, (req, res) => {
  res.redirect("/");
});

app.put("/submit/:id", updatePost, (req, res) => {
  res.redirect("/");
});

app.delete("/submit/:id", deletePost, (req, res) => {
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
