import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendEmails = async (req, res) => {
  const { emailContent, emailAddresses } = req.body;

  try {
    const messages = emailAddresses.map((email) => ({
      to: email,
      from: process.env.SENDER_EMAIL, // Your verified sender email
      subject: "Business Email",
      text: emailContent,
      html: `<p>${emailContent}</p>`,
    }));
    await Promise.all(messages.map((message) => sgMail.send(message)));
    res.status(200).json({ message: "Emails sent successfully!" });
  } catch (error) {
    console.error("Error sending emails:", error);
    res.status(500).json({ message: "Failed to send emails." });
  }
};

export default { sendEmails };
