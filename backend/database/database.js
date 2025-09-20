import mongoose from "mongoose";
import { DB_URI } from "../config/env.js";

const connectToDB = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("Successfully connected to database");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};


export default connectToDB;