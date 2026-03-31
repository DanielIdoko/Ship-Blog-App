import { Request, Response, NextFunction } from "express";

/**
 * Error Handler Middleware
 * Centralized error handling
 */
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  console.error("Error:", err);

  // Handle operational errors
  if (err instanceof Error && (err as any).statusCode) {
    const appError = err as any;
    res.status(appError.statusCode).json({
      success: false,
      message: appError.message,
      error: err.message,
      statusCode: appError.statusCode,
    });
  } else {
    // Handle unknown errors
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
      statusCode: 500,
    });
  }
};

/**
 * Async Handler Wrapper
 * Wraps async route handlers to catch errors
 */
export const asyncHandler =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

/**
 * 404 Handler
 */
export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
    statusCode: 404,
  });
};
