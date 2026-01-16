import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { getModel } from "../helper/db.helper.js";

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const model = getModel("userModel");
  if (!model) throw new Error("Model not found");
  const user = await model.create({ username, password: hashedPassword });
  console.log(`User ${user.username} registered`);
  res.render("login.ejs");
};

export const logout = (req: Request, res: Response) => {
  req.logOut((err) => {
    if (err) {
      res.redirect("index.ejs");
    }
    console.log("User logged out");
  });
  res.redirect("/");
  console.log(`User Logged out`);
};
