import {
  _ID_REQ,
  EXPECTEDAVAILABLE,
  ISBN_REQ,
  LONG_STR_REQ,
  SHORT_STR_REQ,
  STATUS_REQ,
  YEAR_REQ,
} from "./joiConstants.js";
import { validateData } from "./joiValidation.js";

export const newBookDataValidation = (req, res, next) => {
  const obj = {
    title: SHORT_STR_REQ,
    year: YEAR_REQ,
    imgUrl: LONG_STR_REQ,
    author: SHORT_STR_REQ,
    isbn: ISBN_REQ,
    genre: SHORT_STR_REQ,
    description: LONG_STR_REQ,
  };
  validateData({ req, res, next, obj });
};

export const updateBookDataValidation = (req, res, next) => {
  const obj = {
    status: STATUS_REQ,
    _id: _ID_REQ,
    title: SHORT_STR_REQ,
    year: YEAR_REQ,
    imgUrl: LONG_STR_REQ,
    author: SHORT_STR_REQ,

    genre: SHORT_STR_REQ,
    description: LONG_STR_REQ,
    expectedAvailable: EXPECTEDAVAILABLE,
  };
  validateData({ req, res, next, obj });
};
