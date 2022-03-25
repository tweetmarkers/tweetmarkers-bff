import { config } from 'dotenv';

config();

import { createApp } from './app';

async function main() {
  const app = createApp();

  app.listen(3000);
  console.info('App ready');
}

main();
