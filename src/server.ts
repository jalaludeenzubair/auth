import express from "express";
import passport from "passport";
import session from "express-session";
import path from "path";
import bodyParser from "body-parser";
import authRouter from "./routes/auth.route.js";
import { passportInit } from "./authentication/index.js";
import { connectDB } from "./db.js";
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  statusCode: 429,
  message: "Too many requests, please try again later.",
});

const app = express();

app.use("/api", limiter);

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET || "secret",
  resave: false,
  saveUninitialized: true,
});

app.use(sessionMiddleware);

app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());

app.use(passport.session());

passportInit();

app.set("views", path.join(process.cwd(), "views"));

app.use(express.static(path.join(process.cwd(), "public")));

app.set("view engine", "ejs");

app.use("/", authRouter);

const PORT = process.env.PORT || 8000;

main().catch(console.error);

app.listen(PORT, () => {
  console.log(`Server is running at Port ${PORT}`);
});

async function main() {
  await connectDB();
}
