import mongoose from "mongoose";
import UserModal from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createError } from "../error.js";

export const signup = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const secPass = bcrypt.hashSync(req.body.password, salt);
    const newUser = await UserModal({ ...req.body, password: secPass });
    await newUser.save();
    res.status(201).json({ success: true, msg: "user has been created..." });
  } catch (err) {
    next(err);
  }
};

export const signin = async (req, res, next) => {
  try {
    const user = await UserModal.findOne({ name: req.body.name });
    if (!user) {
      return next(createError(400, "user Not Found"));
    }
    const comPass = await bcrypt.compare(req.body.password, user.password);
    if (!comPass) {
      return next(createError(401, "Wrong Credentials"));
    }
    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, process.env.JWT_SEC_KEY);
    const { password, ...userInfo } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ success: true, userInfo });
  } catch (err) {
    next(err);
  }
};

export default { signup, signin };
