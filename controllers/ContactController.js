import emailSender from "../models/EmailSender.js";
export const contactEmailSend = (req, res) => {
  emailSender.sendEmail(
    req.body.contactName,
    req.body.email,
    req.body.message,
    (ok) => {
      if (ok) {
        res.json("ok");
      } else {
        res.json("no");
      }
    }
  );
};
