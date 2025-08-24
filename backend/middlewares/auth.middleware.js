import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.config.js";
import User from '../models/user.model.js'


const authMiddleware = async (err, req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, JWT_SECRET);

      // Get user from the token
      const user = await User.findById(decoded.id).select("-password");
      req.user = user      
      next();
      
    } catch (err) {
      console.error(err);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }
};

export default authMiddleware;
