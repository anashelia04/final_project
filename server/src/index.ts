import express, { Request, Response } from 'express';
import { findUserByCredentials } from './services/authService';

const router = express.Router();

// Route to handle user login
router.post('/login', (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).send('Username and password are required');
    return;
  }

  const user = findUserByCredentials(username, password);

  if (user) {
    // If user is found, set a secure cookie to manage the session.
    res.cookie('user', user.username, {
      httpOnly: true, // Prevents client-side JS from accessing the cookie
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      maxAge: 24 * 60 * 60 * 1000, // Cookie expires in 24 hours
    });

    // Send back user info (without the password)
    res.status(200).json({ id: user.id, username: user.username });
  } else {
    // If user is not found, send an unauthorized error.
    res.status(401).send('Invalid credentials');
  }
});

// Route to handle user logout
router.post('/logout', (req: Request, res: Response) => {
  // Clear the cookie to end the session.
  res.clearCookie('user');
  res.status(200).send('Logged out successfully');
});

// Route for the frontend to check if a user is currently logged in
router.get('/me', (req: Request, res: Response) => {
  // Check for the presence of the user cookie.
  if (req.cookies && req.cookies.user) {
    res.json({ loggedIn: true, username: req.cookies.user });
  } else {
    res.json({ loggedIn: false });
  }
});

export default router;