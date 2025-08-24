import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import Comment from "../models/comment.model.js";

// Get all comments
export const getComments = async (re, res, next) => {
  try {
    const comments = await Comment.find({ postId: req.params.id.postId});

    if (!comments) {
      res.status(404).json({ success: false, message: "No comment made yet" });
    }

    res.status(200).json({success: "OK", data: comments})
  } catch (error) {
    res.status(500).json({ success: false, message: error });
    next(error);
  }
};

// Make a comment on a post
export const CreateComment = async (req, res, next) => {
  try {
    const newComment = await Comment.create(req.body);

    res.status(200).json({
      success: "OK",
      data: newComment,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
    next(error);
  }
};

// Edit a comment code
export const EditComment = async (req, res, next) => {
  try {
    const editComment = await Comment.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      success: "OK",
      message: "Comment updated successfully",
      data: editComment,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
    next(error);
  }
};

// remove a comment
export const RemoveComment = async (req, res, next) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: "OK",
      message: "Comment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
    next(error);
  }
};
