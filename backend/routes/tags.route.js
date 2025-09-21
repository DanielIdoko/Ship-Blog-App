import { Router } from "express";

const tagRouter = Router();

tagRouter.get("/tags");
tagRouter.get("/posts/tag/:tag");

export default tagRouter;
