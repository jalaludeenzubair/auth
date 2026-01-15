import express from "express";
import { Request, Response } from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Express World!");
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running at Port ${PORT}`);
});
