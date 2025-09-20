import express from "express";
import { PORT } from "./config/env.js";
import connectToDB from "./database/database.js";
const app = express();

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await connectToDB();
});
