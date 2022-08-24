const Book = require("../model/Book");

const getAllBooks = async (req, res, next) => {
  let books;
  try {
    books = await Book.find();
  } catch (err) {
    console.log(err);
  }
  if (!books) {
    return res.status(404).json({ message: "No Product Found" });
  }
  return res.status(200).json({ books });
};

const getById = async (req, res, next) => {
  let id = req.params.id;
  let book;
  try {
    book = await Book.findById(id);
  } catch (err) {
    console.log(err);
  }
  if (!book) {
    return res.status(404).json({ message: "No Book Found" });
  }
  return res.status(200).json({ book });
};

const addBook = async (req, res, next) => {
  // let id = req.params.id;
  const { name, author, description, price, available, imageurl } = req.body;
  let book;
  try {
    book = await Book({
      name,
      author,
      description,
      price,
      available,
      imageurl,
    });
    await book.save();
  } catch (err) {
    console.log(err);
  }

  if (!book) {
    return res.status(500).json({ message: "Unable to add" });
  }
  return res.status(201).json({ book });
};

const updateBook = async (req, res, next) => {
  const id = req.params.id;
  const { name, author, description, price, available, imageurl } = req.body;
  let book;
  try {
    book = await Book.findByIdAndUpdate(id, {
      name,
      author,
      description,
      price,
      available,
      imageurl,
    });
    console.log(book)
    book = await book.save();
  } catch (err) {
    console.log(err);
  }

  if (!book) {
    return res.status(500).json({ message: "Unable to update by this ID" });
  }
  return res.status(201).json({ book });
};

const deleteBook = async (req, res, next) => {
  const id = req.params.id;
  // console.log(id);
  let book;
  try {
    book = await Book.findByIdAndRemove(id);
  } catch (err) {
    console.log(err);
  }

  if (!book) {
    return res.status(404).json({ message: "Unable to delete by this id" });
  }
  return res.status(201).json({ book });
};

// 6. ProtectedRoute 

const ProtectedRoute=(req,res)=>{
  return res.json({message:"Protected Content"})
}
1111
exports.getAllBooks = getAllBooks;
exports.addBook = addBook;
exports.getById = getById;
exports.updateBook = updateBook;
exports.deleteBook = deleteBook;
exports.ProtectedRoute=ProtectedRoute;