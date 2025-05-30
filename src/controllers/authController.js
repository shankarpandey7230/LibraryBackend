import {
  createNewUser,
  getUserByEmail,
  updateUser,
} from "../models/user/UserModel.js";
import { responseClient } from "../middlewares/responseClient.js";
import {
  createNewSession,
  deleteSession,
} from "../models/session/SessionModel.js";
import { v4 as uuidv4 } from "uuid";
import {
  userActivatedNotificationEmail,
  userActivationUrlEmail,
} from "../services/email/emailService.js";
import { comparePassword, hashPassword } from "../utils/bcrypt.js";
import { getJwts } from "../utils/jwt.js";

export const insertNewUser = async (req, res, next) => {
  try {
    const { password } = req.body;

    req.body.password = hashPassword(password);

    //   save user in database
    const user = await createNewUser(req.body);

    if (user?._id) {
      //   unique user activation link for the user in their email address

      const session = await createNewSession({
        token: uuidv4(),
        association: user.email,
      });
      if (session?._id) {
        const url = `${process.env.ROOT_URL}/activate-user?sessionId=${session._id}&t=${session.token}`;

        // we have to send this url which will be dynamic

        // console.log(url);
        const emailId = await userActivationUrlEmail({
          email: user.email,
          url,
          name: user.fName,
        });
        if (emailId) {
          const message =
            "Activation link has been sent to your email. Please follow the instructions ";

          return responseClient({ req, res, message });
        }
      }
    }
    throw new Error("Unable to create account..Try again later");
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.message = "Email already exist in the system, use another email ";
      error.statusCode = 400;
      // console.log(error)
    }

    next(error);
  }
};

export const activateUser = async (req, res, next) => {
  try {
    const { sessionId, t } = req.body;
    // console.log(sessionId, t);
    const session = await deleteSession({
      _id: sessionId,
      token: t,
    });
    if (session?._id) {
      // update user to be active
      const user = await updateUser(
        { email: session.association },
        { status: "active" }
      );
      if (user?._id) {
        // respond to frontend
        // sending email notification
        userActivatedNotificationEmail({ email: user.email, name: user.fName });
        const message = "Your account is activated and you may log in now!";
        return responseClient({ req, res, message });
      }
    }
    const message = "Invalid link or token expired";
    const statusCode = 400;
    responseClient({ req, res, message, statusCode });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // get the user by email
    const user = await getUserByEmail(email);
    if (user?._id) {
      // console.log(user);
      // compare password
      const isPasswordMatch = comparePassword(password, user.password);
      if (isPasswordMatch) {
        console.log("Authenticated");

        // jwt creation
        const jwts = await getJwts(email);
        // response jwt
        return responseClient({
          req,
          res,
          message: "Successful login",
          payload: jwts,
        });
      }
    }

    const message = "Invalid Login Credentials";
    const statusCode = 401;
    responseClient({ req, res, message, statusCode });
  } catch (error) {
    next(error);
  }
};
