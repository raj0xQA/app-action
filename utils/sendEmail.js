import nodemailer from "nodemailer";

export async function sendEmail(subject, message) {
  const transporter = nodemailer.createTransport({
    host: "email-smtp.us-west-2.amazonaws.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SENDGRID_USER,
      pass: process.env.SENDGRID_PASS,
    },
  });

  const recipients = [
    "raj@premio.io",
    // "prateek@premio.io",
    // "gal@premio.io",
    // "deshanki@premio.io",
    // "anoop@premio.io",
    // "jaswinder@premio.io",
    // "michael@premio.io",
    // "miraj@premio.io",
    // "nibir@premio.io",
  ];
  // const recipients = ["raj@premio.io"];

  const mailOptions = {
    from: '"Push Notification Test Reporter" <chatway-automation@chatwaymail.com>',
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
