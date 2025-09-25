import { Router } from "express";
import { deleteUser, getUsers, updateUserRole } from "../controllers/user.handler.js";

const adminRouter = Router();

// // categories
// adminRouter.post("/categories");
// adminRouter.delete("/categories/:id");
// // posts
// adminRouter.delete("/posts/:id");
// // comments
// adminRouter.delete("/comments/:commentId");
// adminRouter.get("/admin/comments");
// adminRouter.get("/admin/users");
// user routes
adminRouter.get("/users", getUsers);
adminRouter.put("/users/:id/role", updateUserRole);
adminRouter.delete("/users/:id", deleteUser);

export default adminRouter;
