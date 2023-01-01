const Book = require("../models/bookModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
// const ApiFeatures = require("../utils/apifeatures");
// const cloudinary = require("cloudinary");

// Get All Books
exports.getAllBooksAdmin = catchAsyncErrors(async (req, res, next) => {
  const books = await Book.find().select(
    "stock title category description price _id"
  );
  const booksCount = await Book.countDocuments();
  res.status(201).json({
    success: true,
    booksCount,
    books,
    message: "All Books Fetched for Admin Successfully!",
  });
});

//Create Product Admin
exports.createBookAdmin = catchAsyncErrors(async (req, res, next) => {
  // for (let i = 1; i < 6; i++) {
  //   const book = await new Book({
  //     title: `title ${i}`,
  //     author: `author ${i}`,
  //     description: `description ${i}`,
  //     price: i,
  //     category: "business",
  //     stock: i,
  //   });
  // book.save();
  // }
  // console.log("IN Create book controller.");
  let { title, author, description, category, price, stock } = req.body;

  // console.log({ title, author, description, category, price, stock });

  const book = await new Book({
    title,
    author,
    description,
    category,
    price,
    stock,
  });
  book.save();

  // 201 "created"
  res.status(201).json({
    success: true,
    book,
    message: "Book created successfully!",
  });
});

// Update Book

exports.updateBook = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  // console.log(req.body);
  const book = await Book.findById(id);

  if (!book) {
    return next(new ErrorHander("Book not found", 404));
  }
  const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    updatedBook,
    message: "Book has been updated successfully!",
  });
});

//Show Details

exports.getBookDetails = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  // console.log(id);
  const book = await Book.findById(id);

  if (!book) {
    return next(new ErrorHander("Book not found", 404));
  }

  res.status(200).json({
    success: true,
    book,
    message: "Book found successfully!",
  });
});

// Delete Book

exports.deleteBook = catchAsyncErrors(async (req, res, next) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    return next(new ErrorHander("Book not found", 404));
  }

  await book.remove();

  res.status(200).json({
    success: true,
    message: "Book Delete Successfully",
  });
});
