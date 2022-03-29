import express from 'express';
import { SESSION_COOKIE_NAME } from '../middlewares/session';

export function createSessionController() {
  const router = express.Router();

  router.get('/api/session', (req, res) => {
    const isLoggedIn = !!req.session.tokenSet;

    if (!isLoggedIn) {
      res.clearCookie(SESSION_COOKIE_NAME);
    }

    res.json({ isLoggedIn: !!req.session.tokenSet });
  });

  return router;
}
