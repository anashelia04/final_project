// server/src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: Error, 
  _req: Request, 
  res: Response, 
  _next: NextFunction
) => {
  console.error(err.stack); // Log the error stack for debugging

  res.status(500).json({ 
    error: "An internal server error occurred." 
  });
};