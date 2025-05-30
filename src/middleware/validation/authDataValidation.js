import {
  EMAILREQ,
  FNAMEREQ,
  LNAMEREQ,
  PASSWORD,
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
    password: PASSWORD,
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
