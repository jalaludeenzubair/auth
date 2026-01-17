import crypto from "crypto";
export function generateHmacSha256(secretKey: string, message: string) {
  const hmac = crypto.createHmac("sha256", secretKey);
  hmac.update(message);
  return hmac.digest("hex");
}

export const generateCSRFToken = () => crypto.randomBytes(64).toString("hex");
