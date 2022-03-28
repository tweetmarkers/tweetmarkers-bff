import express from 'express';
import { useSession } from './middlewares/session';
import { useTwitterOauth2 } from './middlewares/twitter';
import { createUserController } from './controllers/user';
import { createBookmarksController } from './controllers/bookmarks';
import { createSessionController } from './controllers/session';

export function createApp() {
  const app = express();

  app.use(useSession());
  app.use(createSessionController());
  app.use(useTwitterOauth2());
  app.use(createUserController());
  app.use(createBookmarksController());
  app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err);
    res.sendStatus(500);
  });

  return app;
}
