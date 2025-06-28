import { responseClient } from "../middleware/responseClient.js";
import {
  createNewBook,
  getAllBooks,
  getAllPublicBooks,
} from "../models/book/BookModel.js";
import slugify from "slugify";

export const insertNewBook = async (req, res, next) => {
  try {
    const { _id, fName } = req.userInfo;
    const obj = {
      ...req.body,
      slug: slugify(req.body.title, { lower: true }),
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
    if (error.message.includes("E11000 duplicate key")) {
      return responseClient({
        req,
        res,
        message: "Duplicate Data not allowed:" + JSON.stringify(error.keyValue),
        statusCode: 400,
      });
    }
    next(error);
  }
};

export const getAllBooksController = async (req, res, next) => {
  try {
    const payload = await getAllBooks();
    responseClient({
      req,
      res,
      payload,
      message: "all books has been obtained",
    });
  } catch (error) {
    next(error);
  }
};

export const getAllPublicBooksController = async (req, res, next) => {
  try {
    const payload = await getAllPublicBooks();
    responseClient({
      req,
      res,
      payload,
      message: "all books has been obtained",
    });
  } catch (error) {
    next(error);
  }
};
