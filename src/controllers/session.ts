import * as express from 'express';

export function createSessionController() {
  const router = express.Router();

  router.get('/api/session', (req, res) => {
    const isLoggedIn = !!req.session.tokenSet;

    if (!isLoggedIn) {
      res.clearCookie('connect.sid');
    }

    res.json({ isLoggedIn: !!req.session.tokenSet });
  });

  return router;
}
