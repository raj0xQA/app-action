import nodemailer from "nodemailer";

const { SENDGRID_FROM, SENDGRID_HOST, SENDGRID_PORT, SENDGRID_USER, SENDGRID_PASS } = process.env;

export async function sendEmail(subject, message) {
  const transporter = nodemailer.createTransport({
    host: SENDGRID_HOST,
    port: SENDGRID_PORT,
    secure: false,
    auth: {
      user: SENDGRID_USER,
      pass: SENDGRID_PASS,
    },
  });

  const recipients = [
    "raj@premio.io",
  ];

  const mailOptions = {
    from: `Push Notification Test Reporter <${SENDGRID_FROM}>`,
    to: recipients.join(","),
    subject: subject,
    text: message,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.messageId}`);
  } catch (error) {
    console.error(`Failed to send email: ${error.message}`);
  }
}
