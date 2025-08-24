import { Router } from "express";
import authMidleware from "../middlewares/auth.middleware.js";
import {
  CreateComment,
  EditComment,
  RemoveComment,
} from "../handlers/comment.handler.js";

const commentRouter = Router();

// comment routes
commentRouter.post("/", authMidleware, CreateComment);
commentRouter.put("/:id", authMidleware, EditComment);
commentRouter.delete("/:id", authMidleware, RemoveComment);
commentRouter.get("/post/:postId",authMidleware, RemoveComment);


export default commentRouter