import { responseClient } from "../middleware/responseClient.js";
import { createNewBook } from "../models/book/BookModel.js";

export const insertNewBook = async (req, res, next) => {
  try {
    const { _id, fName } = req.userInfo;
    const obj = {
      ...req.body,
      addedBy: {
        name: fName,
        adminId: _id,
      },
      lastUpdatedBy: {
        name: fName,
        adminId: _id,
      },
    };
    // console.log(obj);
    const book = await createNewBook(obj);
    book._id
      ? responseClient({ req, res, message: "Book added Successfully" })
      : responseClient({
          req,
          res,
          message: "Unable to add the book in database try again later",
          statusCode: 401,
        });
  } catch (error) {
    next(error);
  }
};
