import { responseClient } from "../responseClient.js";
import {
  EMAILREQ,
  FNAMEREQ,
  LNAMEREQ,
  OTP,
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
export const newPasswordResetValidation = (req, res, next) => {
  const { password, confirmPassword } = req.body;
  const errors = [];
  const passwordPattern =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*{}|]).{8,}$/;
  if (!passwordPattern.test(password)) {
    errors.push(
      "Password must be at least 8 characters and include uppercase, lowercase, number, and special character"
    );
  }

  if (password !== confirmPassword) {
    errors.push("Passwords do not match");
  }

  if (errors.length > 0) {
    return responseClient({
      req,
      res,
      message: errors.join(", "),
      statusCode: 400,
    });
  }
  delete req.body.confirmPassword;

  const obj = {
    email: EMAILREQ,
    password: PASSWORDREQ,
    otp: OTP,
  };
  validateData({ req, res, next, obj });
};
