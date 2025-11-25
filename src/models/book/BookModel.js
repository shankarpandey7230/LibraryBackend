import BookSchema from "./BookSchema.js";

// inserting user

export const createNewBook = (bookObj) => {
  return BookSchema(bookObj).save();
};
//
export const createManyNewBooks = (books) => {
  return BookSchema.insertMany(books);
};

export const emptyBooks = () => {
  return BookSchema.deleteMany({});
};

export const getAllPublicBooks = () => {
  return BookSchema.find({ status: "active" });
};

export const getAllBooks = () => {
  return BookSchema.find();
};

export const updateBook = ({ _id, ...rest }) => {
  return BookSchema.findByIdAndUpdate(_id, rest, { new: true });
};

export const deleteBook = (_id) => {
  return BookSchema.findByIdAndDelete(_id);
};

// to find a single book (filter={slug and status:"active"})
export const findABook = (filter) => {
  return BookSchema.findOne(filter);
};
