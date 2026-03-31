import { Router } from 'express';
import { protect } from '../../middlewares/auth.middleware';
import { userController } from './user.service';

const userRouter = Router();

// Sync Supabase/Google user with MongoDB
userRouter.post('/sync', protect, userController.syncProfile);
userRouter.get('/profile/:username', userController.getPublicProfile);
userRouter.get('/me', protect, userController.updateMe);
userRouter.patch('/me', protect, userController.updateMe);

export default userRouter;