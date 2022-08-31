import express from "express";
import dotenv from "dotenv";
import UserRouter from "./routes/users.js";
import CommentRouter from "./routes/comments.js";
import VideoRouter from "./routes/videos.js";
import AuthRouter from "./routes/auth.js";
import dbConnect from "./conn/conn.js";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use("/api/users", UserRouter);
app.use("/api/videos", VideoRouter);
app.use("/api/comments", CommentRouter);
app.use("/api/auth", AuthRouter);
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const msg = err.message || "something went wrong";
  return res.status(status).json({ success: false, msg });
});

app.listen(5000, () => {
  dbConnect();
  console.log("server is running...");
});
