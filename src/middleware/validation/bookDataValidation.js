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

export const newBookDataValidation = (req, res, next) => {
  const obj = {
    title: SHORT_STR_REQ,
    year: YEAR_REQ,
    author: SHORT_STR_REQ,
    isbn: ISBN_REQ,
    // image: Joi.any(),
    genre: SHORT_STR_REQ,
    description: LONG_STR_REQ,
  };
  validateData({ req, res, next, obj });
};

export const updateBookDataValidation = (req, res, next) => {
  req.body.expectedAvailable =
    req.body.expectedAvailable === "null" ? null : req.body.expectedAvailable;
  console.log(req.body);
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
    imageList: LONG_STR_REQ.allow(""),
    imgToDelete: STR_ARRAY,
  };
  validateData({ req, res, next, obj });
};
