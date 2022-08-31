import { createError } from "../error.js";
import UserModal from "../models/user.js";
import VideoModal from "../models/video.js";

export const updateUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await UserModal.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json({ success: true, updatedUser });
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, "You can only update you account!"));
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await UserModal.findByIdAndDelete(req.params.id);
      res.status(200).json({ success: true, updatedUser });
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, "You can only delete you account!"));
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await UserModal.findById(req.params.id);
    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

export const subscribe = async (req, res, next) => {
  try {
    await UserModal.findByIdAndUpdate(req.user.id, {
      $push: { subscribedUsers: req.params.id },
    });
    await UserModal.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 },
    });
    res.status(200).json({ success: true, msg: "Subscription Successful" });
  } catch (error) {
    next(error);
  }
};
export const unsubscribe = async (req, res, next) => {
  try {
    await UserModal.findByIdAndUpdate(req.user.id, {
      $pull: { subscribedUsers: req.params.id },
    });
    await UserModal.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: -1 },
    });
    res.status(200).json({ success: true, msg: "Unsubscription" });
  } catch (error) {
    next(error);
  }
};
export const like = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;

  try {
    await VideoModal.findByIdAndUpdate(videoId, {
      $addToSet: { likes: id },
      $pull: { dislikes: id },
    });
    res.status(200).json({ success: true, msg: "video has been liked " });
  } catch (error) {
    next(err);
  }
};
export const dislike = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    await VideoModal.findByIdAndUpdate(videoId, {
      $addToSet: { dislikes: id },
      $pull: { likes: id },
    });
    res.status(200).json({ success: true, msg: "video has been disliked" });
  } catch (error) {
    next(err);
  }
};

export default {
  updateUser,
  deleteUser,
  getUser,
  subscribe,
  unsubscribe,
  like,
  dislike,
};
