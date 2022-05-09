const nodemailer = require("nodemailer");

const sendEmail = async (to, from, subject, text) => {
  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "",
    port: 500,
    secure: false,
    auth: {
      user: "",
      pass: "",
    },
  });

  const info = await transporter.sendMail({
    from: from,
    to: to,
    subject: subject,
    text: text,
  });

};
