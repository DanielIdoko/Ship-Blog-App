import { Router } from "express";
import { bookmarkPost, deletePost, editPost, getAllPosts, getPost, getPostAnalytics, getPostSlug, getTrendingPosts, getUserDrafts, likePost, makePost, publishPost, schedulePost, viewPost } from "../controllers/post.handler.js";

const postRouter = Router();

postRouter.get("/posts", getAllPosts);
postRouter.get("/posts/drafts", getUserDrafts);
postRouter.get("/posts/:id", getPost);
postRouter.get("/posts/slug/:slug", getPostSlug);
postRouter.post("/posts", makePost);
postRouter.put("/posts/:id", editPost);
postRouter.delete("/posts/:id", deletePost);
postRouter.put("/posts/:id/publish", publishPost);
postRouter.put("/posts/:id/schedule", schedulePost);
postRouter.post("/posts/:id/like", likePost);
postRouter.post("/posts/:id/view", viewPost);

postRouter.get('/posts/trending', getTrendingPosts)
postRouter.post('/posts/:id/bookmark', bookmarkPost)
postRouter.post('/analytics/posts/:id', getPostAnalytics)
export default postRouter;