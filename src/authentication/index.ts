import UserModel from "../models/user.model.js";
import { AuthType, getAuthStrategy } from "./getStrategy.js";
import passport from "passport";

export const passportInit = () => {
  passport.use(getAuthStrategy(AuthType.LOCAL));

  passport.serializeUser(
    (
      User: Express.User,
      done: (err: null | string, userId: false | string) => void
    ) => {
      done(null, User._id.toString());
    }
  );

  passport.deserializeUser(async (userId: false | string, done) => {
    const user = await UserModel.findById(userId);
    done(null, user);
  });
};
