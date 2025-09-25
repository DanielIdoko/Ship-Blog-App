import mongose from "mongoose";

const postSchema = new mongose.Schema(
  {
    author: {
      type: mongose.Schema.Types.ObjectId,
      ref: "UserProfile",
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    title: {
      type: String,
      trim: true,
      maxLength: 160,
      default: "Post",
    },
    content: {
      type: String,
      required: true,
      default: "",
    },
    excerpt: {
      type: String,
      trim: true,
      maxLength: 500,
    },
    image: {
      type: String,
      default: "",
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    category: {
      type: String,
      trim: true,
      default: "general",
    },
    status: {
      type: String,
      enum: ["draft", "published", "scheduled"],
      default: "draft",
    },
    scheduledAt: {
      type: Date,
      default: null, // for scheduled publishing
    },
    likes: [
      {
        type: mongose.Schema.Types.ObjectId,
        ref: "UserProfile",
      },
    ],
    likesCount: {
      type: Number,
      default: 0
    },
    views: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        type: mongose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

// Indexes for performance(search, slug and tags)
postSchema.index({ slug: 1 });
postSchema.index({ title: "text", content: "text", tags: 1 });

const Post = mongose.model("Post", postSchema);
export default Post;
