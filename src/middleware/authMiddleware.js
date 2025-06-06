import { responseClient } from "../middlewares/responseClient.js";
import { getOneUser, getUserByEmail } from "../models/user/UserModel.js";
import { getSession } from "../session/SessionModel.js";
import {
  createAccessJWT,
  verifyAccessJWT,
  verifyRefreshJWT,
} from "../utils/jwt.js";

export const userAuthMiddleWare = async (req, res, next) => {
  const { authorization } = req.headers;
  let message = "Unauthorized";
  // get accessJWT
  if (authorization) {
    const token = authorization.split(" ")[1];

    //  check if valid
    const decoded = verifyAccessJWT(token);
    console.log(decoded);

    if (decoded.email) {
      const tokenSession = await getSession({ token });
      if (tokenSession?._id) {
        // get user by email

        const user = await getUserByEmail(decoded.email);
        console.log("User status:", user.status);
        if (user?._id && user.status === "active") {
          req.userInfo = user;
          return next();
        }
      }
    }
    message = decoded === "jwt expired" ? decoded : "Unauthorized";
    // return the user
  }

  responseClient({ req, res, message, statusCode: 401 });
};

export const renewAccessJWTMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  let message = "Unauthorized";
  if (authorization) {
    const token = authorization.split(" ")[1];
    const decoded = verifyRefreshJWT(token);
    if (decoded.email) {
      const user = await getOneUser({
        email: decoded.email,
        refreshJWT: token,
      });
      if (user?._id) {
        // create new accessJWT
        const token = await createAccessJWT(decoded.email);
        // return accessJWT
        return responseClient({
          req,
          res,
          message: "here is the AccessJWT ",
          payload: token,
        });
      }
    }
  }
  responseClient({ req, res, message, statusCode: 401 });
};
