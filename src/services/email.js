const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "",
    pass: "",
  },
});

const sendRegistrationEmail = (email, token) => {
  const mailOptions = {
    from: "",
    to: email,
    subject: "Registration Confirmation",
    html: `<h1>Welcome to our website</h1>
                <p>Please click on the link to confirm your registration</p>
                <a href="http://localhost:3000/confirm/${token}">Confirm Registration</a>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

const sendRecoveryEmail = (email, token) => {
  const mailOptions = {
    from: "",
    to: email,
    subject: "Password Reset",
    text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
        Please click on the following link, or paste this into your browser to complete the process:\n\n
        http://localhost:3000/reset/${token}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = {
  sendRecoveryEmail,
};
