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
