export const userActivationUrlEmailTemplate = ({ email, name, url }) => {
  return {
    from: `LibraryManagement <${process.env.SMTP_EMAIL}>`,
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
  };
};

export const userActivatedNotificationEmailTemplate = ({
  email,
  name,
  url,
}) => {
  return {
    from: `LibraryManagement <${process.env.SMTP_EMAIL}>`,
    to: email, //list of receiver
    subject: "Your account is active ✔",
    text: `Hello ${name}. Your account is active to use. You may go and sign in`,
    html: `
        <p> Hello ${name}</p>
        <br/>
        <br/>
        <p>Your account is ready to use. You may now sign in</p>
        <br/>
    
        
        <br/>
        <br/>
        `,
  };
};
