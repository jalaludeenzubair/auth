import { DB_COLLECTION } from "../constants/db.js";
import { UserModelType } from "../models/user.model.js";

type ModelMap = {
  userModel: UserModelType;
};

type ModelName = keyof typeof DB_COLLECTION;

export const getModel = <N extends ModelName>(
  name: N
): ModelMap[N] | undefined => {
  const model = DB_COLLECTION[name];
  if (!model) throw new Error(`No model found for ${name}`);
  return model;
};
