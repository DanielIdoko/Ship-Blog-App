import { Router } from "express";
import {
  LogoutUser,
  RefetchUser,
  RegisterUser,
  UserLogin,
} from "../handlers/auth.handler.js";

const authRouter = Router();

// Auth routes
authRouter.post("/register", RegisterUser);
authRouter.post("/login", UserLogin);
authRouter.post("/logout", LogoutUser);
authRouter.post("/refetch", RefetchUser);

export default authRouter;