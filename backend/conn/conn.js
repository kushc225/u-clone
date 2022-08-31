import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const dbConnect = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("db connected");
    })
    .catch((err) => {
      console.log(err.message);
    });
};
export default dbConnect;
