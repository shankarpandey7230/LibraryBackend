export const userActivationUrlEmailTemplate = ({ email, name, url }) => {
  return {
<<<<<<< HEAD
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
=======
    from: `'LibraryManagement' <${process.env.SMTP_EMAIL}>`,
    to: email, //list of receiver
    subject: "Activate your account. Follow steps ✔",
    text: `Hello ${name} follow the link to activate your account.${url}`,
    html: `
        <p> Hello ${name}</p>
        <br/>
        <br/>
        <p>Your account has been created. Click here to activate your account</p>
        <br/>
        <a href=${url}>
        <button style="background:green; color:white; padding:2rem">Activate your Account</button>
        </a>
        
        <br/>
        <br/>
        `,
>>>>>>> 632702bc2782d33a0433146f80eb3004181e52ef
  };
};
