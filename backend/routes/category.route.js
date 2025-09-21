import { Router } from "express";

const categoryRouter = Router();

categoryRouter.get("/categories");
categoryRouter.get("/posts/category/:category");

export default categoryRouter;
