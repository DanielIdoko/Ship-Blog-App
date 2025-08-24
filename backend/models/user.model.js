import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "User name is required"],
    trim: true,
    unique: true,
    minLength: 2,
    maxLength: 55,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    unique: true,
    minLength: 2,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, "Please fill in a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: 6,
  },
  bio: {
    type: String,
    required: false,
    minLength: 2
  }
},{timestamps: true});

const User = mongoose.model("User", userSchema);
export default User;
