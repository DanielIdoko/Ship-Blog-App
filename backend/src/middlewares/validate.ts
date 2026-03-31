import { Request, Response, NextFunction } from "express";
import { ZodObject } from "zod";

export const validateSchema =
  (schema: ZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error: any) {
      return res.status(400).json({
        status: "fail",
        errors: error.errors.map((e: any) => ({
          path: e.path[0],
          message: e.message,
        })),
      });
    }
  };
