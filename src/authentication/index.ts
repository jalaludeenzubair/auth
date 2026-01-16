import { AuthType, getAuthStrategy } from "./getStrategy.js";
import passport from "passport";
import { getModel } from "../helper/db.helper.js";

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
    const model = getModel("userModel");
    if (!model) throw new Error("Model not found");
    const user = await model.findById(userId);
    done(null, user);
  });
};
