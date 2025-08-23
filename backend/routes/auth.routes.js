import { Router } from "express";
import { LogoutUser, RegisterUser, UserLogin } from "../handlers/user.handler.js";

const authRouter = Router();

// Auth routes
authRouter.post("/register", RegisterUser);
authRouter.post("/login", UserLogin);
authRouter.post("/logout", LogoutUser);
