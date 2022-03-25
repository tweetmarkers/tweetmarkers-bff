import * as express from 'express';
import * as httpStatus from 'http-status';
import { Twitter } from '../services/twitter';

export function createBookmarksController(): express.Router {
  const router = express.Router();

  router.get('/api/bookmarks', async (req, res) => {
    const twitter = new Twitter({ accessToken: req.session.tokenSet.access_token });
    const next = req.query.next as string;

    const { id } = await twitter.getCurrentUser();
    const bookmarks = await twitter.getUserBookmarks(id, { next });

    res.json(bookmarks);
  });

  router.delete('/api/bookmarks/:id', async (req, res) => {
    const twitter = new Twitter({ accessToken: req.session.tokenSet.access_token });

    const { id } = await twitter.getCurrentUser();

    console.log('Remove tweet', req.params.id, 'from user', id, 'bookmarks');

    const { bookmarked } = await twitter.removeBookmark(id, req.params.id);

    if (!bookmarked) {
      res.sendStatus(httpStatus.NO_CONTENT);
    } else {
      res.sendStatus(httpStatus.CONFLICT);
    }
  });

  router.put('/api/bookmarks/:id/like', async (req, res) => {
    const twitter = new Twitter({ accessToken: req.session.tokenSet.access_token });

    const { id } = await twitter.getCurrentUser();

    console.log('Like tweet', req.params.id, 'for user', id);

    const { liked } = await twitter.likeTweet(id, req.params.id);

    if (liked) {
      res.sendStatus(httpStatus.NO_CONTENT);
    } else {
      res.sendStatus(httpStatus.CONFLICT);
    }
  });

  router.delete('/api/bookmarks/:id/like', async (req, res) => {
    const twitter = new Twitter({ accessToken: req.session.tokenSet.access_token });

    const { id } = await twitter.getCurrentUser();
    const { liked } = await twitter.likeTweet(id, req.params.id);

    console.log('Unlike tweet', req.params.id, 'for user', id);

    if (!liked) {
      res.sendStatus(httpStatus.NO_CONTENT);
    } else {
      res.sendStatus(httpStatus.CONFLICT);
    }
  });

  router.put('/api/bookmarks/:id/archive', (req, res) => {
    res.sendStatus(httpStatus.NOT_IMPLEMENTED);
  });
  router.delete('/api/bookmarks/:id/archive', (req, res) => {
    res.sendStatus(httpStatus.NOT_IMPLEMENTED);
  });

  return router;
}
