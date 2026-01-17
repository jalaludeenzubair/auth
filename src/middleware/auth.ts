import { Response, Request, NextFunction } from "express";
export const checkLoggedIn = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.isAuthenticated()) {
    return res.redirect("/home");
  }
  next();
};

export const checkAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};
