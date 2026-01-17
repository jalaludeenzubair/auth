import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import UserModel from "../models/user.model.js";
import { generateCSRFToken, generateHmacSha256 } from "../utils/auth.js";

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await UserModel.create({ username, password: hashedPassword });
  console.log(`User ${user.username} registered`);
  res.render("login.ejs");
};

export const logout = (req: Request, res: Response) => {
  req.logOut((err) => {
    if (err) {
      res.redirect("login.ejs");
    }
    console.log("User logged out");
  });
  res.redirect("/");
};

export const successLogin = (req: Request, res: Response) => {
  const csrfToken = generateCSRFToken();
  const secretToken = generateHmacSha256(
    process.env.SECRET_KEY_CSRF || "secret",
    csrfToken,
  );
  res.cookie("csrfToken", csrfToken, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    maxAge: 15 * 60 * 1000,
  });
  res.cookie("secretCsrfToken", secretToken, {
    httpOnly: true,
    secure: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.redirect("/home");
};

export const validateCSRFToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const csrfToken = req.headers["x-csrf-token"] as string;

  if (!csrfToken) return res.status(401).send("Unauthorized");

  const secretToken = generateHmacSha256(
    process.env.SECRET_KEY_CSRF || "secret",
    csrfToken,
  );

  if (secretToken !== req.cookies.secretCsrfToken) {
    return res.status(401).send("Unauthorized");
  }
  next();
};
