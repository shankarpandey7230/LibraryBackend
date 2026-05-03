import { responseClient } from "../middleware/responseClient.js";
import { updateBook } from "../models/book/BookModel.js";
import {
  createNewBurrows,
  getBurrows,
  updateBurrows,
} from "../models/burrowHistory/BurrowHistoryModel.js";

const DUE_DAYS = 15;
export const insertNewBurrow = async (req, res, next) => {
  try {
    const { _id } = req.userInfo;

    let today = new Date();
    const dueDate = new Date(today);
    dueDate.setDate(dueDate.getDate() + DUE_DAYS);
    req.body = req.body.map((book) => {
      return {
        ...book,
        userId: _id,
        dueDate,
      };
    });

    // console.log(req.body);
    const burrow = await createNewBurrows(req.body);
    if (burrow.length) {
      // update booktable with expectedAvailableDate = dueDate
      burrow.map(async ({ bookId }) => {
        await updateBook({ _id: bookId, expectedAvailable: dueDate });
      });
    }
    burrow.length
      ? responseClient({
          req,
          res,
          message: "Burrowed book and  added Successfully",
          payload: burrow,
        })
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
export const getBurrowsController = async (req, res, next) => {
  try {
    const { _id, role } = req.userInfo;
    const path = req.path;
    console.log(path);
    const isAdmin = path === "/admin";

    // console.log(req.body);
    const burrow = isAdmin
      ? await getBurrows()
      : await getBurrows({ userId: _id });
    if (burrow.length) {
      responseClient({
        req,
        res,
        message: "Here is the burrowed list",
        payload: burrow,
      });
    }
  } catch (error) {
    next(error);
  }
};
export const returnBookController = async (req, res, next) => {
  try {
    const { _id } = req.userInfo;
    // console.log(_id);
    // console.log(req.body);
    // user id and burrow id
    // update borrow table

    const filter = {
      _id: req.body._id,
      userId: _id,
    };
    const obj = {
      isReturned: true,
      returnedDate: new Date(),
    };
    const result = await updateBurrows(filter, obj);
    if (result?._id) {
      const updatedBook = await updateBook({
        _id: result.bookId,
        expectedAvailable: null,
      });
      if (updatedBook?._id) {
        // book returned successfully
        return responseClient({
          req,
          res,
          message: "Your book has been returned successfully",
        });
      }
      return responseClient({
        req,
        res,
        message: "Unable to return the book, Please contact admin",
        statusCode: 400,
      });
    }
    return responseClient({
      req,
      res,
      message: "Burrow record not found",
      statusCode: 404,
    });
    //updateBooktable:ExpectedAvailable = null
    // send email notification:TODO
  } catch (error) {
    next(error);
  }
};
