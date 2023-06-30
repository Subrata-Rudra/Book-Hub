const express = require("express");
const router = express.Router();
const Author = require("../models/author");

// All Authors Route
router.get("/", async (req, res) => {
  let searchOptions = {};
  if (req.query.name != null && req.query.name !== "") {
    searchOptions.name = new RegExp(req.query.name, "i"); // It will search the name in the Author database, then will store the result in the name of searchOptions object, and the searching will not be case-sensitive(as "i" is given)
  }
  try {
    const authors = await Author.find(searchOptions);
    res.render("authors/index", { authors: authors, searchOptions: req.query });
  } catch {
    res.redirect("/");
  }
});

// New Author Route
router.get("/new", (req, res) => {
  res.render("authors/new", { author: new Author() });
});

// Create Author Route
router.post("/", async (req, res) => {
  const author = new Author({
    name: req.body.name,
  });

  try {
    const newAuthor = await Author.create(author);
    res.redirect(`authors/${newAuthor._id}`);
  } catch (err) {
    res.render("authors/new", {
      author: author,
      errorMessage: "Error in Creating Author",
    });
  }
});

router.get("/:id", (req, res) => {
  res.send("Show Author " + req.params.id);
});

router.get("/:id/edit", async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    res.render("authors/edit", { author: author });
  } catch {
    res.redirect("/authors");
  }
});

router.put("/:id", async (req, res) => {
  let author;
  try {
    author = await Author.findById(req.params.id);
    author.name = req.body.name;
    await author.save();
    res.redirect(`/authors/${author._id}`);
  } catch (err) {
    if (author == null) {
      res.redirect("/");
    } else {
      res.render("authors/edit", {
        author: author,
        errorMessage: "Error in Updating Author",
      });
    }
  }
});


// error occurs in deleting
router.delete("/:id", async (req, res) => {
  let author;
  try {
    author = await Author.findById(req.params.id);
    console.log(author);
    await author.deleteOne();
    console.log("author deleted");
    res.redirect("/authors");
  } catch {
    if (author == null) {
      console.log("author not found");
      res.redirect("/");
    } else {
      console.log("can't delete author");
      res.redirect(`/authors/${author.id}`);
    }
  }
});
// error occurs in deleting

module.exports = router;
