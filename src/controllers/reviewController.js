import { responseClient } from "../middleware/responseClient.js";
import { createReviews } from "../models/review/ReviewModel.js";

export const insertReviewController = async (req, res, next) => {
  try {
    const { _id, fName, lName } = req.userInfo;
    const reviewObj = {
      userId: _id,
      user: `${fName} ${lName}`,
      isApproved: false,
      ...req.body,
      //   bookId,
      //   title,
      //   reviewMessage,
      //   rating,
      //   burrowId,
    };
    const result = await createReviews(reviewObj);

    result._id
      ? responseClient({
          req,
          res,
          message: "The Review has been added successfully",
        })
      : responseClient({
          req,
          res,
          message: "Review can not be added. Try again later",
          statusCode: 401,
        });
  } catch (error) {
    next(error);
  }
};
