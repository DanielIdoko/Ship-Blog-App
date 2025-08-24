import express from "express";
import Comment from "../models/comment.model.js";
import Post from "../models/post.model.js";

// Get all posts
export const GetPosts = async (req, res, next) => {
  try {
    // Get all posts if there is no query passed in, otherwise get based on the query
    const { search } = req.query;

    let posts;

    if (search) {
      posts = await Post.find({
        title: { $regex: search, $options: "i" },
      }).sort({ createdAt: -1 });
    } else {
      posts = await Post.find().sort({ createdAt: -1 });
    }

    res.status(200).json({ success: "OK", data: posts });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "An error occured while fetching posts",
    });
    next(err);
  }
};

// get user specific posts
export const GetUserPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({ userId: req.params.userId });
    res.status(200).json({ success: "OK", data: posts });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
    next(error);
  }
};

// Get post details
export const GetPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    res.status(200).json({ success: "OK", data: post });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
    next(error);
  }
};

// Make a post on a comment
export const CreatePost = async (req, res, next) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      // username: req.user.username,
      user: req.user._id,
    });

    console.log(req.body);
    

    res.status(201).json({
      success: "OK",
      data: newPost,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err });
    next(err);
  }
};

// Edit a post
export const EditPost = async (req, res, next) => {
  try {
    const editPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      success: "OK",
      message: "post updated successfully",
      data: editPost,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
    next(error);
  }
};

// remove a post
export const RemovePost = async (req, res, next) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    await Comment.deleteMany({ postId: req.params.id });

    res.status(200).json({
      success: "OK",
      message: "post successfully deleted",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
    next(error);
  }
};
