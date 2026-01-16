import mongoose from "mongoose";

const connect = mongoose.connection;
export const connectDB = async () => {
  const url = process.env.MONGO_URL || "mongodb://localhost:27017/auth-service";

  connect.on("connected", async () => {
    console.log("MongoDb Connection Established");
  });
  connect.on("reconnected", async () => {
    console.log("MongoDB Connection Reestablished");
  });
  connect.on("disconnected", () => {
    console.log("MongoDB Connection Disconnected");
    console.log("Trying to reconnect to Mongo...");

    setTimeout(() => {
      mongoose.connect(url);
    }, 3000);
  });
  connect.on("close", () => {
    console.log("Mongo Connection Closed");
  });
  connect.on("error", (error: Error) => {
    console.log("Mongo Connection Error: " + error);
  });
  await mongoose.connect(url).catch((error: Error) => console.log(error));
};
