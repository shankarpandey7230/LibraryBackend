export const responseClient = ({ req, res, message, statusCode = 200 }) => {
  // successful response

  req.success = () => {
    return res.status(statusCode).json({
      status: "success",
      message,
    });
  };

  // Error response
  req.error = () => {
    return res.status(statusCode).json({
      status: "error",
      message,
    });
  };
  if (statusCode >= 200 && statusCode < 300) {
    return req.success();
  } else {
    return req.error();
  }
};
