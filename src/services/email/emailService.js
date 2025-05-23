import { emailTransporter } from "./transport.js";
import {
  userActivatedNotificationEmailTemplate,
  userActivationUrlEmailTemplate,
} from "./emailTemplate.js";

export const userActivationUrlEmail = async (obj) => {
  // get the transporter

  // get the template

  const info = await emailTransporter().sendMail(
    userActivationUrlEmailTemplate(obj)
  );
  console.log(info.messageId);

  return info.messageId;
};

export const userActivatedNotificationEmail = async (obj) => {
  // get the transporter

  // get the template

  const info = await emailTransporter().sendMail(
    userActivatedNotificationEmailTemplate(obj)
  );
  console.log(info.messageId);

  return info.messageId;
};
