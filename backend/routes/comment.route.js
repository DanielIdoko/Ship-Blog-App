import { Router } from "express";

const commentRouter = Router();

commentRouter.get('/posts/:postId/comments', )
commentRouter.post('/posts/:postId/comments', )
commentRouter.post('/comments/:commentId/reply', )
commentRouter.post('/comments/:commentId/like', )

export default commentRouter