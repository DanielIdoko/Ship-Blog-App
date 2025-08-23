import express from "express";
import { PORT, NODE_ENV } from "./config/env.config.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToDB from "./database/database.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser)
// CORS -> to allow resource sahring between the frontend and the backend
const corsOptions = {
  origin: "*",
  Credential: true,
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(PORT, async (req, res) => {
  console.log(`App running on http://localhost:${PORT}`);
  await connectToDB();
});
