import UserModel from "../models/user.model.js";

export const DB_COLLECTION = {
  userModel: UserModel,
} as const;

export const DB_COLLECTION_NAME = {
  userModel: "userModel",
} as const;
