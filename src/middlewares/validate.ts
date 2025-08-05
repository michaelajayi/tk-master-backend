import { Request, Response, NextFunction } from "express";
import { ZodType, ZodError } from "zod";
import { NODE_ENV } from "../interfaces/global.interface";

const isDev = process.env.NODE_ENV === NODE_ENV.DEVELOPMENT;

// console.log('isDev', isDev);

const validate =
  (schema: ZodType<any, any, any>) => (req: Request, res: Response, next: NextFunction) => {
    
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (err: unknown) {
      if(err instanceof ZodError) {
        console.error('Validation Errors:', err.issues);
        return res.status(400).json({
          message: "Validation failed",
          errors: err.issues
        });
      }
      
      if (err instanceof Error) {
        console.error(err.message);
        return res.status(400).json({
          message: "Validation failed",
          ...(isDev && { error: err.message })
        });
      }

      // fallback for non-standard errors
      return res.status(500).json({
        message: "An unexpectd error occured",
        err,
      });
    }
  };

export default validate;
