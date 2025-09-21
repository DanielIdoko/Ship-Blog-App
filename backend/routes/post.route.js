import { Router } from "express";
import { getAllPosts } from "../controllers/post.handler";

const postRouter = Router();

postRouter.get("/posts", getAllPosts);
postRouter.get("/posts/drafts");
postRouter.get("/posts/:id");
postRouter.get("/posts/slug/:slug");
postRouter.post("/posts");
postRouter.put("/posts/:id");
postRouter.delete("/posts/:id");
postRouter.put("/posts/:id/publish");
postRouter.put("/posts/:id/schedule");
postRouter.post("/posts/:id/like");
postRouter.post("/posts/:id/view");

postRouter.get('/posts/trending')
postRouter.post('/posts/:id/bookmark',)
postRouter.post('/analytics/posts/:id',)
export default postRouter;