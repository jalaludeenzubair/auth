import bcrypt from "bcryptjs";
import { getModel } from "../helper/db.helper.js";

export const localAuth = async (
  username: string,
  password: string,
  done: (error: string | null, userId: Express.User | false) => void
) => {
  const model = getModel("userModel");
  if (!model) throw new Error("Model not found");
  const user = await model.findOne({ username });

  if (!user) return done(null, false);

  bcrypt.compare(password, user.password, (err, result) => {
    if (err) {
      console.error(err);
      return done(err.message, false);
    }
    if (result) {
      console.log("Password matches!");
      return done(null, user);
    } else {
      console.log("Password incorrect.");
      return done(null, false);
    }
  });
};
