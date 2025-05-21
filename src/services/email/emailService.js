import { userActivationUrlEmailTemplate } from "./emailTemplate.js";
import { emailTransporter } from "./Transport.js";

export const userActivationUrlEmail = async (obj) => {
  const info = await emailTransporter().sendMail(
    userActivationUrlEmailTemplate(obj)
  );
  //   console.log("Message sent:", info.messageId);
  return info.messageId;
};
