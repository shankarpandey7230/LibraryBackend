import { emailTransporter } from "./transport.js";
import {
  passwordResetOTPSendTemplate,
  userActivatedNotificationEmailTemplate,
  userActivationUrlEmailTemplate,
  userProfileUpdatedNotificationTemplate,
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
  // console.log(info.messageId);

  return info.messageId;
};

export const passwordResetOTPNotificationEmail = async (obj) => {
  const transport = emailTransporter();
  const info = await transport.sendMail(passwordResetOTPSendTemplate(obj));

  return info.messageId;
};

export const userProfileUpdatedNotificationEmail = async (obj) => {
  const transport = emailTransporter();
  const info = await transport.sendMail(
    userProfileUpdatedNotificationTemplate(obj)
  );

  return info.messageId;
};
