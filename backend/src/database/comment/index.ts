import { model, Schema } from "mongoose";

const CommentSchema = new Schema({
  post_id: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: true,
    index: true,
  },
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  parent_id: { type: Schema.Types.ObjectId, ref: "Comment", default: null },
  content: { type: String, required: true, maxlength: 2000 },
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  created_at: { type: Date, default: Date.now },
});

// Index to fetch all comments for a specific post quickly
CommentSchema.index({ post_id: 1, created_at: 1 });

export const Comment = model("Comment", CommentSchema);
