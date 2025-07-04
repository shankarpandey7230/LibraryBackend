import BookSchema from "./BookSchema.js";

// inserting user

export const createNewBook = (bookObj) => {
  return BookSchema(bookObj).save();
};

export const getAllPublicBooks = () => {
  return BookSchema.find({ status: "active" });
};

export const getAllBooks = () => {
  return BookSchema.find();
};

export const updateBook = ({ _id, ...rest }) => {
  return BookSchema.findByIdAndUpdate(_id, rest);
};

export const deleteBook = (_id) => {
  return BookSchema.findByIdAndDelete(_id);
};
