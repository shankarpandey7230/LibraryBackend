import BookSchema from "./BookSchema.js";

// inserting user

export const createNewBook = (bookObj) => {
  return BookSchema(bookObj).save();
};
