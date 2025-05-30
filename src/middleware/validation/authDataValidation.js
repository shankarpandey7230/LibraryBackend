import {
  EMAILREQ,
  FNAMEREQ,
  LNAMEREQ,
  PASSWORDREQ,
  PHONEREQ,
  SESSIONREQ,
  TOKENREQ,
} from "./joiConstants.js";
import { validateData } from "./joiValidation.js";

export const newUserDataValidation = (req, res, next) => {
  const obj = {
    fName: FNAMEREQ,
    lName: LNAMEREQ,
    email: EMAILREQ,
    phone: PHONEREQ,
    password: PASSWORDREQ,
  };
  validateData({ req, res, next, obj });
};

export const userActivationDataValidation = (req, res, next) => {
  //   create schema or rules
  const obj = {
    sessionId: SESSIONREQ,
    t: TOKENREQ,
  };
  validateData({ req, res, next, obj });
};

export const loginDataValidation = (req, res, next) => {
  const obj = {
    email: EMAILREQ,
    password: PASSWORDREQ,
  };
  validateData({ req, res, next, obj });
};
