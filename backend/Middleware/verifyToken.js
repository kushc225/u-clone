import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import { createError } from "../error.js";

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(404, "login first"));
  }
  Jwt.verify(token, process.env.JWT_SEC_KEY, (err, decoded) => {
    if (err) {
      return next(createError(403, "you are not a valid user"));
    }
    req.user = decoded;
    next();
  });
};

export default { verifyToken };
