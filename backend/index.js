import express from "express";
import { PORT, NODE_ENV } from "./config/env.config.js";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import connectToDB from "./database/database.js";
import authRoute from "./routes/auth.routes.js";
import postRouter from "./routes/post.route.js";
import commentRoute from "./routes/comment.route.js";
import userRouter from "./routes/user.routes.js";
import multer from "multer";
import { fileURLToPath } from "url";

const app = express();

// This code will allo me use __dirname inside this file as it isn't defined in the ES6 module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/images", express.static(path.join(__dirname, "/images")));

// Code to allow resource sharing between the frontend and the backend
const corsOptions = {
  origin: "*",
  Credential: true,
};

app.use(cors(corsOptions));

// Basic routes
app.use("/api/auth", authRoute);
app.use("/api/user", userRouter);
app.use("/api/comments", commentRoute);
app.use("/api/posts", postRouter);

// Code to get and upload image
const storage = multer.diskStorage({
  destination: (req, file, fn) => {
    fn(null, "images");
  },
  filename: (req, file, fn) => {
    fn(null, req.body.img);
  },
});

const uploadImage = multer({ storage: storage });
app.post("api/upload", uploadImage.single("file"), (req, res) => {
  res.status(200).json({
    success: "OK",
    message: "Image uploaded successfully",
  });
});

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(PORT, async (req, res) => {
  console.log(`App running on http://localhost:${PORT} in ${NODE_ENV} mode`);
  await connectToDB();
});