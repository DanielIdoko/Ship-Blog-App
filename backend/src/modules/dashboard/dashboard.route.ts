import { Router } from 'express';
import { protect } from '../../middlewares/auth.middleware';
import { restrictTo } from '../../middlewares/admin.middleware';
import { adminController } from './dashboard.service';

const dashboardRouter = Router();

dashboardRouter.use(protect);
dashboardRouter.use(restrictTo('admin'));

// Platform Statistics (Total users, posts today, etc.)
dashboardRouter.get('/stats', adminController.getGlobalStats);
dashboardRouter.delete('/posts/:id', adminController.forceDeletePost);
dashboardRouter.patch('/users/:id/role', adminController.updateUserRole);

export default dashboardRouter;