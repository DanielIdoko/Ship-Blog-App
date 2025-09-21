import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: [true, "Clerk Id id required"],
      unique: true,
    },
    username: {
      type: String,
      required: [true, "User name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "User email is required"],
    },
    role: {
      type: String,
      enum: ["reader", "author", "admin"],
      default: "reader",
    },
    bio: {
      type: String,
      default: "",
      trim: true,
    },
    avatarUrl: {
      type: String,
      default: "",
    },
    savedPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    stats: {
      postsCount: { type: Number, default: 0 },
      likesCount: { type: Number, default: 0 },
      commentCount: { type: Number, default: 0 },
      sharesCount: { type: Number, default: 0 },
    },
    preferences: {
      darkMode: { type: Boolean, default: false },
      language: { type: String, default: "en" },
    },
  },
  { timestamps: true }
);

const UserProfile = mongoose.model("UserProfile", userSchema);

export default UserProfile;