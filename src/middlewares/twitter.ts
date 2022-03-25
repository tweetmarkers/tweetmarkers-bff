import { twitterOAuth2 } from 'twitter-oauth2';

const scopes = [
  'tweet.read',
  'users.read',
  'bookmark.read',
  'bookmark.write',
  'like.read',
  'like.write'
];

export function useTwitterOauth2() {
  return twitterOAuth2({
    client_id: process.env.TWITTER_CLIENT_ID,
    client_secret: process.env.TWITTER_CLIENT_SECRET,
    redirect_uri: process.env.TWITTER_CLIENT_REDIRECT_URI,
    scope: scopes.join(' ')
  });
}
