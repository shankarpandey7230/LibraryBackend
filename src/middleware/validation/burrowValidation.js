import {
  _ID_REQ,
  EXPECTEDAVAILABLE,
  ISBN_REQ,
  LONG_STR,
  LONG_STR_REQ,
  SHORT_STR_REQ,
  STATUS_REQ,
  STR_ARRAY,
  YEAR_REQ,
} from "./joiConstants.js";
import Joi from "joi";
import { validateData } from "./joiValidation.js";

export const newBurrowDataValidation = (req, res, next) => {
  const bookObj = {
    bookId: SHORT_STR_REQ,
    booTitle: YEAR_REQ,
    thumbnail: SHORT_STR_REQ,
  };
  validateData({ req, res, next, obj });
};
