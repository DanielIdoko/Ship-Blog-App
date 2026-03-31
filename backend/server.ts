import dns from "dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]);

import express, { Application } from "express";
import { config } from "./src/config/env";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import { globalLimiter } from "./src/middlewares/rateLimiter";
import { errorHandler, notFoundHandler } from "./src/middlewares/index";
import { connectDatabase } from "./src/database/db/db";

const app: Application = express();

// Parsers & Logging
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// Rate limiting
app.use(globalLimiter);

app.listen(config.PORT, "0.0.0.0", async () => {
  await connectDatabase();
  console.log(`
       ------------[Ship API server running on http://locahost:${config.PORT}]-----------
        `);
});

app.use(notFoundHandler);
app.use(errorHandler);
