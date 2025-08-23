import bcypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.config.js";

// Code for user sign up
export const RegisterUser = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const salt = await bcypt.genSalt(10);
    const hashedPassword = await bcypt.hash(password, salt);

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
      { _id, username: user.username, email: user.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    const { password, ...info } = user._doc;
    res.cookie("token", token, {
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


export const LogoutUser = async (req, res, next) => {
    try {
        
    } catch (error) {
        next(error)
    }
}