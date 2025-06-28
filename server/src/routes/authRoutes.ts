import express, { Request, Response } from 'express';
import { findUserByCredentials } from '../services/authService';

const router = express.Router();


router.post('/login', (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).send('Username and password are required');
    return;
  }

  const user = findUserByCredentials(username, password);

  if (user) {
    
    res.cookie('user', user.username, {
      httpOnly: true, 
      maxAge: 24 * 60 * 60 * 1000, 
    });
    res.status(200).json({ id: user.id, username: user.username });
  } else {
    res.status(401).send('Invalid credentials');
  }
});


router.post('/logout', (req: Request, res: Response) => {
  res.clearCookie('user');
  res.status(200).send('Logged out successfully');
});


router.get('/me', (req: Request, res: Response) => {
  
  if (req.cookies && req.cookies.user) {
    res.json({ loggedIn: true, username: req.cookies.user });
  } else {
    res.json({ loggedIn: false });
  }
});

export default router;