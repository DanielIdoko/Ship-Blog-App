import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import Comment from "../models/comment.model.js";

//Update user profile
export const updateProfile = async (req, res, next) => {
  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = bcrypt.hashSync(req.body.password, salt);
    }

    const updatedUser = User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      success: "OK",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ error });
    next(error);
  }
};

// Delete User
export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    await Post.deleteMany({ userId: req.params.id });
    await Comment.deleteMany({ userId: req.params.id });

    res.status(200).json({
      success: true,
      message: "User acount has been successfully deleted",
    });
  } catch (error) {
    res.status(500).json({ error });
    next(error);
  }
};

// Get user details
export const getUser = async (req, res, next) => {
  try {
    const userDetails = await User.findById(req.params.id);

    if(!userDetails){
      res.status(404).json({
        success: false,
        message: "Sorry, that account must have been deleted, try creating one?"
      })
    }

    const { password, ...info } = userDetails._doc;


    res.status(200).json({
      success: true,
      data: info,
    });
    
  } catch (error) {
    res.status(500).json({ error });
    next(error);
  }
};
