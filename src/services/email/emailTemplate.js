export const userActivationUrlEmailTemplate = ({ email, name, url }) => {
  return {
    from: `"Library" <${process.env.SMTP_EMAIL}>`,
    to: email,
    subject: "Activate your new account. Action REquired",
    text: `Hello ${name} follow the link to activate your account.${url}`, // plain‑text body
    html: `
      <p>Hello ${name}</p>
      <br/>
      <br/>
      <br/>
      <p>Your account is created click the link to activate your account</p>
      <br/>
      <br/>
      <a href=${url}>
      <button style ="background:green; color:white; padding 2rem">Activate now</button></a>
      <br/>
      <br/>
    Regards,
    <br/>
    `, // HTML body
  };
};
