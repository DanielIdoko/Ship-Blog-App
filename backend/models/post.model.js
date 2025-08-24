import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {},
    desc: {
      type: String,
      required: [true, "Please add a description to your blog post"],
      unique: true,
    },
    post_image: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
