const nodemailer = require("nodemailer");
const {
  MAIL_USERNAME,
  MAIL_PASSWORD,
  OAUTH_CLIENTID,
  OAUTH_CLIENT_SECRET,
  OAUTH_REFRESH_TOKEN,
  PORT,
} = require("../config/index");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: MAIL_USERNAME,
    pass: MAIL_PASSWORD,
    clientId: OAUTH_CLIENTID,
    clientSecret: OAUTH_CLIENT_SECRET,
    refreshToken: OAUTH_REFRESH_TOKEN,
  },
});

const sendRegistrationEmail = (email, token) => {
  const mailOptions = {
    from: MAIL_USERNAME,
    to: email,
    subject: "Registration Confirmation",
    html: `<h1>Welcome to our website</h1>
                <p>Please click on the link to confirm your registration</p>
                <a href="http://localhost:${PORT}/confirm/${token}">Confirm Registration</a>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

const sendPasswordResetEmail = async (email, token) => {
  const mailOptions = {
    from: MAIL_USERNAME,
    to: email,
    subject: "Password Reset",
    text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
        Please click on the following link, or paste this into your browser to complete the process:\n\n
        http://localhost:${PORT}/api/auth/resetpassword/${token}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`,
  };

  try {
    info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return { message: "Email sent", status: 200 };
  } catch (err) {
    console.log(err);
    return { message: "Error sending email", status: 500 };
  }
};

module.exports = {
  sendPasswordResetEmail,
  sendRegistrationEmail,
};
