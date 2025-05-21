import { hashPassword } from "../utils/bcrypt.js";
import { createNewUser } from "../models/user/UserModel.js";
import { responseClient } from "../middlewares/responseClient.js";
import { createNewSession } from "../models/session/SessionModel.js";
import { v4 as uuidv4 } from "uuid";
import { userActivationUrlEmail } from "../services/email/emailService.js";

export const insertNewUser = async (req, res, next) => {
  // console.log("req", req.body);

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
        const url = `${process.env.ROOT_URL}/activate-user ?sessionId=${session._id}&t=${session.token}`;

        // sending the url to the email
        // console.log(url);
        const emailId = await userActivationUrlEmail({
          email: user.email,
          url,
          name: user.fName,
        });
        if (emailId) {
          const message = "We have sent you an email for activation link";
          return responseClient({ req, res, message });
        }
      }
    }
    throw new Error("Unable to create an account, try again later");
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.message = "Same email has been created already ";
      error.statusCode = 400;
    }
    next(error);
  }
};
