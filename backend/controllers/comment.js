import { createError } from "../error.js";
import CommentModal from "../models/comments.js";
import VideoModal from "../models/video.js";

export const addComment = async (req, res, next) => {
  const newComment = new CommentModal({ ...req.body, userId: req.user.id });
  try {
    const savedComment = await newComment.save();
    res.status(200).json({ savedComment });
  } catch (error) {
    next(error);
  }
};

export const deleteComments = async (req, res, next) => {
  try {
    const comment = await CommentModal.findById(req.params.id);
    const video = await VideoModal.findById(req.params.id);
    if (req.user.id === comment.userId || req.user.id === video.userId) {
      res
        .status(200)
        .json({ success: true, msg: "The Comment has been deleted" });
    } else {
      return next(createError(403, "you can delete only your comment"));
    }
  } catch (error) {
    next(error);
  }
};
export const getComments = async (req, res, next) => {
  try {
    const comments = await CommentModal.find({ videoId: req.params.videoId });
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

export default { addComment, deleteComments, getComments };
