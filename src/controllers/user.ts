import * as express from 'express';
import { Twitter } from '../services/twitter';

export function createUserController(): express.Router {
  const router = express.Router();

  router.get('/api/auth', (req, res) => {
    const from = req.query.from as string;
    console.log('Redirect to', from)

    res.redirect(from || 'http://localhost:8100');
  });

  router.get('/api/user', async (req, res) => {
    const twitter = new Twitter({
      accessToken: req.session.tokenSet.access_token
    });

    const user = await twitter.getCurrentUser();

    res.json(user);
  });

  return router;
}
