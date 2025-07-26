import Joi from "joi";
export const FNAME = Joi.string().min(5);
export const FNAMEREQ = FNAME.required();
export const LNAME = Joi.string().min(5);
export const LNAMEREQ = LNAME.required();
export const EMAIL = Joi.string().email({ minDomainSegments: 2 });
export const EMAILREQ = EMAIL.required();
export const PASSWORD = Joi.string().min(5);
export const PASSWORDREQ = PASSWORD.required();
export const PHONE = Joi.number();
export const PHONEREQ = PHONE.required();
export const SESSION = Joi.string().min(10).max(30);
export const SESSIONREQ = SESSION.required();
export const TOKEN = Joi.string().min(10);
export const TOKENREQ = TOKEN.required();

export const OTP = Joi.number().min(999).max(9999).required();

export const SHORT_STR = Joi.string().min(1).max(100);
export const SHORT_STR_REQ = SHORT_STR.required();

export const LONG_STR = Joi.string().min(1).max(5000);
export const LONG_STR_REQ = LONG_STR.required();

export const STR_ARRAY = Joi.array().items(Joi.string());
export const STR_ARRAY_REQ = STR_ARRAY.required();
export const YEAR = Joi.number()
  .integer()
  .min(1901)
  .max(new Date().getFullYear());

export const YEAR_REQ = YEAR.required();

export const _ID = Joi.string();
export const _ID_REQ = _ID.required();

export const STATUS = Joi.string().valid("active", "inactive");
export const STATUS_REQ = STATUS.required();

export const EXPECTEDAVAILABLE = Joi.date().allow(null, "");
export const EXPECTEDAVAILABLE_REQ = EXPECTEDAVAILABLE.required();

// export const ISBN = Joi.number().integer().min(10000000).max(999999999999999);
export const ISBN = Joi.string()
  .pattern(/^\d{10}$|^\d{13}$/)
  .messages({ "string.pattern.base": "ISBN is not in valid format" });

export const ISBN_REQ = ISBN.required();
