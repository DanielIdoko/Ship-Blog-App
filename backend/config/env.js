import { config } from "dotenv";

config({ path: "./.env.example" });

export const { PORT, DB_URI } = process.env;
