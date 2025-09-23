import express, { urlencoded } from "express";
import { PORT } from "./config/env.js";
import connectToDB from "./database/database.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
import adminRouter from "./routes/admin.route.js";
import postRouter from "./routes/post.route.js";
const app = express();


// Middlewares
app.use(express.json({urlencoded: false}))
app.use(cookieParser())

// routes
app.use('/api', userRouter)
app.use('/api', adminRouter)
app.use('/api', postRouter)


app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await connectToDB();
});
