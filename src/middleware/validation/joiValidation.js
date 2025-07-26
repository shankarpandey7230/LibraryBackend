import Joi from "joi";
import { responseClient } from "../../middleware/responseClient.js";
import { deleteUploadedFiles } from "../../utils/fileUtils.js";

export const validateData = ({ req, res, next, obj }) => {
  // console.log(req.body);
  //   create schema or rules
  const schema = Joi.object(obj);
  //pass your data, req.body , to the schema
  const { error } = schema.validate(req.body);

  if (error) {
    // console.log(req.file, req.files);
    if (req.file || Array.isArray(req.files)) {
      // proceed to delete th file
      deleteUploadedFiles(req);
    }
    return responseClient({
      req,
      res,
      message: error.message,
      statusCode: 400,
    });
  }
  next();
  // if it gets fail go to next() or response error from here
};
