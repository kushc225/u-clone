import express from "express";
import {
  addComment,
  deleteComments,
  getComments,
} from "../controllers/comment.js";
import { verifyToken } from "../Middleware/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, addComment);
router.delete("/:id", verifyToken, deleteComments);
router.get("/:videoId", verifyToken, getComments);

export default router;
