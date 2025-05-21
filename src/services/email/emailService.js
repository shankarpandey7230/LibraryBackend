<<<<<<< HEAD
import { userActivationUrlEmailTemplate } from "./emailTemplate.js";
import { emailTransporter } from "./Transport.js";

export const userActivationUrlEmail = async (obj) => {
  const info = await emailTransporter().sendMail(
    userActivationUrlEmailTemplate(obj)
  );
  //   console.log("Message sent:", info.messageId);
=======
import { emailTransporter } from "./transport.js";
import { userActivationUrlEmailTemplate } from "./emailTemplate.js";

export const userActivationUrlEmail = async (obj) => {
  // get the transporter

  // get the template

  const info = await emailTransporter().sendMail(
    userActivationUrlEmailTemplate(obj)
  );
  console.log(info.messageId);
>>>>>>> 632702bc2782d33a0433146f80eb3004181e52ef
  return info.messageId;
};
