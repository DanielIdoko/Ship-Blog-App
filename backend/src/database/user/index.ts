import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    supabase_id: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true },
    avatar_url: { type: String, default: "" },
    bio: { type: String, maxlength: 500 },
    interests: [{ type: String }],
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true },
);

// Index for fast lookups by Supabase ID
UserSchema.index({ supabase_id: 1 });

export const User = model("User", UserSchema);
