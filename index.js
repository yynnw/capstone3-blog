import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;

const __dirname = dirname(fileURLToPath(import.meta.url));
const posts = []

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render('index.ejs', { title: 'Home Page', posts:posts });
})

app.get("/new", (req, res) =>{
  res.render('new.ejs', { title: 'New'});
})

app.post("/submit", (req, res) => {
  const data = req.body;
  if (Object.values(data).every(value => value === '')){
    res.redirect('/');
  }else{
    const newPost = {author: data.author, date: data.date, postTitle: data.title,
      subTitle: data.subtitle, blog: data.blog};
      posts.push(newPost);
      console.log(Object.values(data));
      res.redirect('/');
  }
})

app.get("/read-more/:id", (req, res) => {
  const postId = req.params.id;
  const post = posts[Number(postId)];
  res.render("read-more.ejs", { title: 'Blog', post:post, id: postId });
})

app.get("/delete/:id", (req, res) => {
const postId = req.params.id;
posts.splice(Number(postId), 1);
res.redirect('/');
})

app.get("/edit/:id", (req, res) => {
const postId = req.params.id;  
res.render("edit.ejs", {title:"Edit",post:posts[Number(postId)], id:postId});
})

app.post("/update/:id", (req, res) => {
const postId = req.params.id;
const data = req.body;
posts[Number(postId)].blog = data.blog;
res.render("read-more.ejs", { title: 'Blog', post:posts[Number(postId)], id: postId });
})

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});