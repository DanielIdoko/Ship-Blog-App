import bcypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import cookieparser from "cookie-parser";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.config.js";

// Code for user sign up
export const RegisterUser = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const salt = await bcypt.genSalt(10);
    const hashedPassword = await bcypt.hash(password, salt);

    const user = await User.findOne({email: req.body.email})
    if(user){
      res.status(403).json({
        success: false,
        message: "Sorry, that user already exists. Please try again with another email or login"
      })
    }
    // create a new user from the credentials gotten from the body
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // send a created successfully message of OK and save the use data
    res.status(201).json({
      success: "OK",
      data: newUser,
      messsage: "Account created Successfully !"
    });
  } catch (error) {
    next(error);

    res.status(500).json({
      success: false,
      message: "Sorry, couldn't create your account, please try again",
    });
  }
};

// code for user login
export const UserLogin = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user)
      return res.status(404).json({
        success: false,
        message: "User Account not found, try creating one",
      });

    const matchPassword = bcypt.compare(req.body.password, user.password);

    // help user create new password if they have forgotten theirs
    if (!matchPassword) {
      return res.status(404).json({
        success: false,
        message: "Invalid credentials or password passed",
      });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username, email: user.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    const { password, ...info } = user._doc;
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      })
      .status(200)
      .json({ info });

  } catch (error) {
    next(error);
  }
};

// logout route
export const LogoutUser = async (req, res, next) => {
  try {
    res
      .clearCookie("token", { sameSite: "None", secure: true })
      .status(200)
      .json({ success: true, message: "User logged out successfully" });
  } catch (error) {
    next(error);
    res.status(500).json(error);
  }
};

// refetch route
export const RefetchUser = async (req, res, next) => {
  const token = req.cookies.token;
  jwt.verify(token, JWT_SECRET, {}, async (err, data) => {
    if (err) {
      return res.status(404).json({
        success: false,
        message: err,
      });
    }

    res.status(200).json({
      success: "OK",
      data: data
    });

  });
};
