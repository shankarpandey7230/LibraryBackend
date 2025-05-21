<<<<<<< HEAD
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
=======
import { hashPassword } from "../../utils/bcrypt.js";
import { responseClient } from "../middleware/responseClient.js";
import { createUser } from "../models/user/UserModel.js";
import { userActivationUrlEmail } from "../services/email/emailService.js";
import { createSession } from "../session/SessionModel.js";
import { v4 as uuidv4 } from "uuid";
export const insertNewUser = async (req, res, next) => {
  try {
    // console.log(req.body)
    const { password } = req.body;
    req.body.password = hashPassword(password);

    //insert into DB
    const user = await createUser(req.body);
    if (user?._id) {
      // create an unique user activation link and send to their email

      const session = await createSession({
>>>>>>> 632702bc2782d33a0433146f80eb3004181e52ef
        token: uuidv4(),
        association: user.email,
      });
      if (session?._id) {
<<<<<<< HEAD
        const url = `${process.env.ROOT_URL}/activate-user ?sessionId=${session._id}&t=${session.token}`;

        // sending the url to the email
=======
        const url = `${process.env.ROOT_URL}/activate-user?sessionId=${session._id}&t=${session.token}`;

        // we have to send this url which will be dynamic
>>>>>>> 632702bc2782d33a0433146f80eb3004181e52ef
        // console.log(url);
        const emailId = await userActivationUrlEmail({
          email: user.email,
          url,
          name: user.fName,
        });
        if (emailId) {
<<<<<<< HEAD
          const message = "We have sent you an email for activation link";
=======
          const message =
            "Activation link has been sent to your email. Please follow the instructions ";
>>>>>>> 632702bc2782d33a0433146f80eb3004181e52ef
          return responseClient({ req, res, message });
        }
      }
    }
<<<<<<< HEAD
    throw new Error("Unable to create an account, try again later");
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.message = "Same email has been created already ";
      error.statusCode = 400;
    }
=======
    throw new Error("Unable to create account..Try again later");
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.message = "Email already exist in the system, use another email ";
      error.statusCode = 400;
      // console.log(error)
    }

>>>>>>> 632702bc2782d33a0433146f80eb3004181e52ef
    next(error);
  }
};
