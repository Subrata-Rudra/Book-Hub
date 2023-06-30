const mongoose = require("mongoose");
const Book = require("./book");

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

// error occurs here
authorSchema.pre("deleteOne", function (next) {
  console.log("Inside pre");
  Book.find({ author: this.id }, (err, books) => {
    console.log("inside book.find");
    if (err) {
      console.log("inside if(err)");
      next(err);
    } else if (books.length > 0) {
      console.log("inside book.length");
      next(new Error("This author has books still"));
    } else {
      console.log("inside last else");
      next();
    }
  });
});
// error occurs here

// chatgpt start-------
// authorSchema.pre('deleteOne', function (next) {
//   try {
//     const books = Book.find({ author: this.id });
//     if (books.length > 0) {
//       throw new Error("This author has books still");
//     } else {
//       next();
//     }
//   } catch (err) {
//     next(err);
//   }
// });
// chatgpt end--------

// youtube comment start ----
// authorSchema.pre("deleteOne", async function (next) {
//   try {
//     const query = this.getFilter();
//     const hasBook = await Book.exists({ author: query._id });
//     if (hasBook) {
//       next(new Error("This author still has books."));
//     } else {
//       next();
//     }
//   } catch (err) {
//     next(err);
//   }
// });
// youtube comment end ----

module.exports = mongoose.model("Author", authorSchema);
