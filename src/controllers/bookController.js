import { responseClient } from "../middleware/responseClient.js";
import {
  createNewBook,
  deleteBook,
  getAllBooks,
  getAllPublicBooks,
  updateBook,
} from "../models/book/BookModel.js";
import fs from "fs";

import slugify from "slugify";
import { deleteFile, deleteUploadedFiles } from "../utils/fileUtils.js";

export const insertNewBook = async (req, res, next) => {
  try {
    const { _id, fName } = req.userInfo;
    const { path } = req.file;

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
      imgUrl: path,
      imageList: [path],
    };
    // console.log(obj);
    const book = await createNewBook(obj);
    if (book._id) {
      responseClient({ req, res, message: "Book added Successfully" });
    } else {
      responseClient({
        req,
        res,
        message: "Unable to add the book in database try again later",
        statusCode: 401,
      });

      deleteUploadedFiles(req);
    }
  } catch (error) {
    deleteUploadedFiles(req);
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

export const updatedBookController = async (req, res, next) => {
  try {
    const { _id, fName } = req.userInfo;
    console.log(req.body);
    // console.log(req.files);
    // let imageList = [req.body.imgUrl];

    req.body.imageList = req.body.imageList.split(",");
    // remove imgToDelete list from imageList
    if (req.body.imgToDelete?.length) {
      req.body.imageList = req.body.imageList.filter(
        (img) => !req.body.imgToDelete?.includes(img)
      );
      req.body.imgToDelete?.map((img) => deleteFile(img));
    }
    if (Array.isArray(req.files)) {
      req.body.imageList = [
        ...req.body.imageList,
        ...req.files.map((obj) => obj.path),
      ];
    }
    const obj = {
      ...req.body,
      lastUpdatedBy: {
        name: fName,
        adminId: _id,
      },
    };
    if (!req.body.imageList.includes(req.body.imgUrl)) {
      req.body.imageList.unshift(req.body.imgUrl); // ✅ insert thumbnail at the start
    }

    // console.log("Update Payload:", req.body);
    // console.log(obj);
    const book = await updateBook(obj);
    book?._id
      ? responseClient({ req, res, message: "Book updated  Successfully" })
      : responseClient({
          req,
          res,
          message: "Unable to update the book, Try again later",
          statusCode: 400,
        });
  } catch (error) {
    next(error);
  }
};

export const deleteBookController = async (req, res, next) => {
  try {
    //
    const { _id } = req.params;
    const book = await deleteBook(_id);
    // console.log(book);
    book?.imageList?.map((img) => deleteFile(img));
    book?._id
      ? responseClient({
          req,
          res,
          message: "The book has been deleted successfully",
        })
      : responseClient({
          req,
          res,
          message: "Unable to delete the book. Something went wrong",
          statusCode: 400,
        });
  } catch (error) {
    next(error);
  }
};
