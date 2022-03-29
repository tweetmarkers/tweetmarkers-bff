import redis from 'redis';
import connectRedis from 'connect-redis';
import session from 'express-session';

export const SESSION_COOKIE_NAME = 'tweetmarkers.session';

export function useSession() {
  const RedisStore = connectRedis(session);
  const client = redis.createClient({
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT),
    password: process.env.REDIS_PASS
  });

  client.on('connect', () => {
    console.log('Redis connected');
  });

  client.on('error', (err) => {
    console.log('Redis error', err.message);
  });

  return session({
    name: SESSION_COOKIE_NAME,
    store: new RedisStore({
      prefix: 'session:',
      client
    }),
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET
  });
}
