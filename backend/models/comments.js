import mongoose from "mongoose";
const commentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    videoId: {
      type: String,
      required: true,
    },
    des: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("comments", commentSchema);
