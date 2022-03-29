import { RedisMemoryServer } from 'redis-memory-server';

async function main() {
  const redisServer = new RedisMemoryServer({
    instance: {
      port: 6379,
      args: [ '--requirepass', 'redis' ]
    }
  });

  const host = await redisServer.getHost();
  const port = await redisServer.getPort();

  // kill process before reload
  process.on('SIGTERM', async () => {
    await redisServer.stop();
    process.exit(0);
  });

  console.log(`Redis started at ${ host }:${ port }`);
}

main();
