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
    // res.redirect(`authors/${newAuthor._id}`);
    res.redirect("authors");
  } catch (err) {
    res.render("authors/new", {
      author: author,
      errorMessage: "Error in Creating Author",
    });
  }
});

module.exports = router;
