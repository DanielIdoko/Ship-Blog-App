import mongoose from "mongoose";
import { MONGODB_URI } from "../config/env.config.js";

const connectToDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to database successfully (*_*)");
  } catch (error) {
    console.error(error);
  }
};


export default connectToDB;