import session from 'express-session';

export function useSession() {
  return session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET
  });
}
