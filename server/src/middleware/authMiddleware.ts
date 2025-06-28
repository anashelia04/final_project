import { Request, Response, NextFunction } from 'express';

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  
  if (req.cookies && req.cookies.user) {
    
    next();
  } else {
    res.status(401).send('Unauthorized: You must be logged in.');
  }
};