import { Router } from 'express';
import { protect } from '../../middlewares/auth.middleware';
import { validateSchema } from '../../middlewares/validate';
import { CreatePostDTO } from '../../dtos/post.dto';
import { postController } from './post.service';

const postRouter = Router();

// Public: Get all posts (filterable by ?niche=tech or ?type=news)
postRouter.get('/', postController.getAll);
postRouter.get('/:slug', postController.getBySlug);
postRouter.post('/', protect, validateSchema(CreatePostDTO), postController.create);
postRouter.patch('/:id', protect, postController.update);
postRouter.delete('/:id', protect, postController.delete);

export default postRouter;