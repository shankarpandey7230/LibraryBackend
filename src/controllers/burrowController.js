import { responseClient } from "../middleware/responseClient.js";
import { createNewBurrows } from "../models/burrowHistory/BurrowModel.js";

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
      responseClient({
        req,
        res,
        message: "Burrowed book and  added Successfully",
        payload: burrow,
      });
    } else {
      responseClient({
        req,
        res,
        message: "Unable to add the book in database try again later",
        statusCode: 401,
      });
    }
  } catch (error) {
    next(error);
  }
};
