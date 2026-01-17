export const SMTP_Provider = {
  gmail: {
    USER: process.env.GMAIL_EMAIL_USER,
    PASSWORD: process.env.GMAIL_EMAIL_APP_PASSWORD,
  },
};
export const EMAIL_TEMPLATE = {
  TESTING: "<h1>{$content}</h1>",
};
