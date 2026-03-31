import { Router } from 'express';
import { protect } from '../../middlewares/auth.middleware';
import { validateSchema } from '../../middlewares/validate';
import { CreateCommentDTO } from '../../dtos/comment.dto';
import { commentController } from './comment.service';

const commentRouter = Router();

// Get comments for a specific post
commentRouter.get('/post/:postId', commentController.getByPost);
commentRouter.post('/', protect, validateSchema(CreateCommentDTO), commentController.create);
commentRouter.post('/:id/like', protect, commentController.toggleLike);

export default commentRouter;