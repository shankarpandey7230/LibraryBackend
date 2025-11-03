// connect database
// model

import { connectDB } from "../../config/dbconfig.js";
import { createManyNewBooks, emptyBooks } from "../../models/book/BookModel.js";
import books from "./book-seeds.js";

const importData = async () => {
  try {
    await connectDB();
    // call empty database
    // call function bulk import
    await emptyBooks();
    await createManyNewBooks(books);
    console.log("all books has been imported");
  } catch (error) {
    console.log(error);
  }
};

importData();
