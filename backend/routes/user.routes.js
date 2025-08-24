import { Router } from "express";
import { deleteUser, getUser, updateProfile } from "../handlers/user.handler.js";
import authMidleware from "../middlewares/auth.middleware.js";

const userRouter = Router();

// user routes
userRouter.get("/:id", authMidleware, getUser);
userRouter.put("/:id", authMidleware, updateProfile);
userRouter.delete("/:id", authMidleware, deleteUser);

export default userRouter;