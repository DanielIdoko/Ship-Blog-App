import { model, Schema } from "mongoose";

const PostSchema = new Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true }, 
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  niches: [{ type: String, index: true }],
  type: { 
    type: String, 
    enum: ['post', 'news', 'talk'], 
    default: 'post',
    index: true 
  },
  status: {
    type: String,
    enum: ['draft', 'active', 'posted', 'archived']
  },
  cover_image: { type: String },
  tags: [{ type: String }],
  views: { type: Number, default: 0 },
  likes_count: { type: Number, default: 0 },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  comments_count: { type: Number, default: 0 },
  shares_count: { type: Number, default: 0 },
  is_published: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});


// Compound index for niche-specific feeds (e.g., "Latest News in Tech")
PostSchema.index({ niche: 1, type: 1, created_at: -1 });

export const Post = model('Post', PostSchema);