import { Router } from "express";
import authMidleware from "../middlewares/auth.middleware.js";
import {
  CreatePost,
  EditPost,
  GetPost,
  GetPosts,
  GetUserPosts,
  RemovePost,
} from "../handlers/post.handler.js";

const postRouter = Router();

// post routes
postRouter.post("/", authMidleware, CreatePost);
postRouter.put("/:id", authMidleware, EditPost);
postRouter.delete("/:id", authMidleware, RemovePost);
postRouter.get("/:id", authMidleware, GetPost);
postRouter.get("/", authMidleware, GetPosts);
postRouter.get("/user/:userId", authMidleware, GetUserPosts);

export default postRouter;
