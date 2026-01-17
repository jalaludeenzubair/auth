import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import UserModel from "../models/user.model.js";

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
