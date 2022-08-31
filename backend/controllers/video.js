import { createError } from "../error.js";
import VideoModal from "../models/video.js";
import UserModal from "../models/user.js";

export const addVideo = async (req, res, next) => {
  const newVideo = new VideoModal({ userId: req.user.id, ...req.body });
  try {
    const savedVideo = await newVideo.save();
    res.status(201).json({ success: true, savedVideo });
  } catch (error) {
    next(error);
  }
};
export const updateVideo = async (req, res, next) => {
  try {
    const video = await VideoModal.findById(req.params.id);
    if (!video) return next(createError(404, "video not found.."));
    if (req.user.id === video.userId) {
      const updatedVideo = await VideoModal.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(201).json({ success: true, updatedVideo });
    } else {
      next(createError(409, "you can only update you own account video"));
    }
  } catch (error) {
    next(error);
  }
};

export const deleteVideo = async (req, res, next) => {
  try {
    const video = await VideoModal.findById(req.params.id);
    if (!video) return next(createError(404, "video not found.."));
    if (req.user.id === video.userId) {
      const deletedVideo = await VideoModal.findByIdAndDelete(req.params.id);
      res
        .status(201)
        .json({ success: true, msg: "video has been deleted", deletedVideo });
    } else {
      next(createError(409, "you can only delete you own account video"));
    }
  } catch (error) {
    next(error);
  }
};

export const getVideo = async (req, res, next) => {
  try {
    const video = await VideoModal.findById(req.params.id);
    res.status(200).json(video);
  } catch (error) {
    next(error);
  }
};
export const addView = async (req, res, next) => {
  try {
    await VideoModal.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });
    res.status(200).json("the view has been increased.");
  } catch (error) {
    next(error);
  }
};
export const random = async (req, res, next) => {
  try {
    const videos = await VideoModal.aggregate([{ $sample: { size: 40 } }]);
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};
export const trend = async (req, res, next) => {
  try {
    const videos = await VideoModal.find().sort({ views: -1 });
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};
export const sub = async (req, res, next) => {
  try {
    const user = await UserModal.findById(req.user.id);
    const substcribedChannels = user.subscribedUsers;
    const list = await Promise.all(
      substcribedChannels.map((channelId) => {
        return VideoModal.find({ userId: channelId });
      })
    );
    res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
  } catch (error) {
    next(error);
  }
};

export const getByTag = async (req, res, next) => {
  const tags = req.query.tags.split(",");
  try {
    const videos = await VideoModal.find({ tags: { $in: tags } }).limit(10);
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};
export const search = async (req, res, next) => {
  const query = req.query.q;
  try {
    const videos = await VideoModal.find({
      title: { $regex: query, $options: "i" },
    }).limit(10);
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};

export default {
  addVideo,
  updateVideo,
  deleteVideo,
  getVideo,
  trend,
  sub,
  addView,
  getByTag,
  search,
};
