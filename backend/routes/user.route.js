import { Router } from "express";
import { getMyProfile, getPublicUserById, updateMyProfile } from "../controllers/user.handler";

const userRouter = Router();


userRouter.get('/users/me', getMyProfile)
userRouter.put('/users/me', updateMyProfile)
userRouter.get('/users/:id', getPublicUserById)

export default userRouter;