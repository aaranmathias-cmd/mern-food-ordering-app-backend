import dns from "dns";

dns.setServers(["1.1.1.1"]);

import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from './routes/MyUserRoute';

const app = express();

app.use(express.json());
app.use(cors());

app.get("/health", async (req: Request, res: Response) => {
  res.send({ message: "health OK!" });
});
app.use("/api/my/user", myUserRoute);

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => {
    console.log("Connected to database");
    app.listen(7000, () => {
      console.log("server started on localhost:7000");
    });
  })
  .catch((err) => {
    console.error("Failed to connect to database:", err.message);
    process.exit(1);
  });