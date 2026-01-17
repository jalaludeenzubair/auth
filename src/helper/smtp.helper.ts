import nodemailer from "nodemailer";
import { EMAIL_TEMPLATE, SMTP_Provider } from "../constants/smtp.js";

class SMTPHelper {
  private transporter: nodemailer.Transporter;
  private USER: string;
  private PASSWORD: string;
  constructor(type: keyof typeof SMTP_Provider) {
    const USER = SMTP_Provider[type].USER;
    const PASSWORD = SMTP_Provider[type].PASSWORD;

    if (!USER || !PASSWORD) {
      throw new Error("SMTP credentials not found");
    }

    this.USER = USER;
    this.PASSWORD = PASSWORD;

    this.transporter = nodemailer.createTransport({
      service: type,
      auth: {
        user: this.USER,
        pass: this.PASSWORD,
      },
    });
  }

  renderHtml(
    content: Record<string, string>,
    type: keyof typeof EMAIL_TEMPLATE
  ) {
    const template = EMAIL_TEMPLATE[type];
    const htmlContent = Object.entries(content).reduce((acc, [key, value]) => {
      return acc.replace(`{$${key}}`, value);
    }, template);
    return htmlContent;
  }

  sendEmail = async (
    recipientEmail: string,
    subject: string,
    content: Record<string, string>,
    type: keyof typeof EMAIL_TEMPLATE
  ) => {
    const htmlContent = this.renderHtml(content, type);

    const mailOptions = {
      from: this.USER,
      to: recipientEmail,
      subject: subject,
      html: htmlContent,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log("Email sent: " + info.response);
      return info;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else if (typeof error === "string") {
        console.error(error);
      } else {
        console.error("An unexpected error occurred");
      }
    }
  };
}

export default SMTPHelper;
