import { Request, Response } from "express";
import { User } from "../../database/user";
import { sendError, sendSuccess } from "../../utils/api-response";

export const userController = {
  syncProfile: async (req: Request, res: Response) => {
    try {
      const { id, email, user_metadata } = (req as any).user;

      const userData = {
        supabase_id: id,
        email: email,
        username:
          user_metadata.full_name || user_metadata.name || email.split("@")[0],
        avatar_url: user_metadata.avatar_url || "",
        last_login: new Date(),
      };

      const user = await User.findOneAndUpdate(
        { supabase_id: id },
        { $set: userData },
        {
          upsert: true,
          new: true,
          setDefaultsOnInsert: true,
        },
      );

      sendSuccess(res, 200, "User sync successful!", user);
    } catch (error: any) {
      console.error("Sync Error:", error);

      sendError(res, (error = error));
    }
  }
};
