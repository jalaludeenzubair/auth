import { Router } from "express";
import { Response, Request } from "express";
import { checkAuthenticated, checkLoggedIn } from "../middleware/auth.js";
import passport from "passport";

import { logout, register } from "../controller/auth.controller.js";

const router = Router();

router.get("/", checkLoggedIn, (req, res) => {
  res.render("login.ejs");
});

router.get("/signup", (req, res) => {
  res.render("signup.ejs");
});

router.get("/dashboard", (req, res) => {
  const URL = process.env.APPLICATION_BASE_URL || "http://localhost:3000";
  res.redirect(URL + "/dashboard");
});

router.post("/signup", register);

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/",
  })
);

router.post("/logout", checkAuthenticated, logout);

export default router;
