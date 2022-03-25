import axios from 'axios';
import { DateTime } from 'luxon';

export type TwitterConfig = {
  accessToken: string;
};

type GetBookmarksOptions = {
  next?: string;
};

export class Twitter {
  constructor(private config: TwitterConfig) {}

  async getCurrentUser() {
    const { data } = await axios.get('https://api.twitter.com/2/users/me', {
      headers: {
        'Authorization': `Bearer ${ this.config.accessToken }`
      }
    });

    return data.data;
  }

  async getUserBookmarks(userID: string, { next }: GetBookmarksOptions = {}) {
    const query = new URLSearchParams({
      expansions: 'author_id',
      'tweet.fields': [ 'author_id', 'created_at', 'public_metrics' ].join(','),
      'user.fields': 'name'
    })

    if (next) {
      query.set('pagination_token', next)
    }

    const { data } = await axios.get(`https://api.twitter.com/2/users/${ userID }/bookmarks?${ query.toString() }`, {
      headers: {
        'Authorization': `Bearer ${ this.config.accessToken }`
      }
    });

    return {
      results: await Promise.all(data.data.map(async (bookmark) => {
        const author = data.includes.users.find((user) => user.id === bookmark.author_id);

        return {
          author: author.name,
          author_handle: author.username,
          content: bookmark.text,
          date: DateTime.fromISO(bookmark.created_at).toFormat('LLL dd'),
          ...bookmark.public_metrics,
          ...bookmark
        }
      })),
      next: data.meta.next_token
    };
  }

  async removeBookmark(userID: string, tweetID: string) {
    const { data } = await axios.delete(`https://api.twitter.com/2/users/${ userID }/bookmarks/${ tweetID }`, {
      headers: {
        'Authorization': `Bearer ${ this.config.accessToken }`
      }
    });

    return data.data;
  }

  async likeTweet(userID: string, tweetID: string) {
    const { data } = await axios.post(`https://api.twitter.com/2/users/${ userID }/likes`, {
      tweet_id: tweetID
    }, {
      headers: {
        'Authorization': `Bearer ${ this.config.accessToken }`
      }
    });

    return data.data;
  }

  async unlikeTweet(userID: string, tweetID: string) {
    const { data } = await axios.delete(`https://api.twitter.com/2/users/${ userID }/likes/${ tweetID }`, {
      headers: {
        'Authorization': `Bearer ${ this.config.accessToken }`
      }
    });

    return data.data;
  }

  async getTweetLikes(tweetID: string) {
    const { data } = await axios.get(`https://api.twitter.com/2/tweets/${ tweetID }/liking_users`, {
      headers: {
        'Authorization': `Bearer ${ this.config.accessToken }`
      }
    });

    console.log(data);

    return data.data;
  }
}
