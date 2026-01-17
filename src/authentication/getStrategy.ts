import { Strategy } from "passport";
import { localAuth } from "./localAuth.js";
import { Strategy as LocalStrategy } from "passport-local";

export enum AuthType {
  LOCAL = "local",
}

export const getAuthStrategy = (type: AuthType): Strategy => {
  switch (type) {
    case AuthType.LOCAL:
      return new LocalStrategy(localAuth);
    default:
      throw new Error(`Unsupported auth type: ${type}`);
  }
};
