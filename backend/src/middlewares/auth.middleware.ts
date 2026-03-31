import { Request, Response, NextFunction } from "express";
import { supabase } from "../lib/supabase";
import { User } from "../database/user/index";

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer "))
    return res.status(401).json({ message: "Unauthorized" });

  const token = authHeader.split(" ")[1];

  try {
    const {
      data: { user: supabaseUser },
      error,
    } = await supabase.auth.getUser(token);
    if (error || !supabaseUser)
      return res.status(401).json({ message: "Invalid Token" });

    (req as any).user = supabaseUser;

    const mongoUser = await User.findOne({ supabase_id: supabaseUser.id });
    if (mongoUser) {
      (req as any).mongoUser = mongoUser;
    }

    next();
  } catch (err) {
    return res.status(401).json({ message: "Auth failed" });
  }
};
