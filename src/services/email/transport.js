import nodemailer from "nodemailer";

export const emailTransporter = () => {
  // create a SMTP transporter
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: +process.env.SMTP_PORT,

    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });
  return transporter;
};
