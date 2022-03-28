import serverless from 'serverless-http'
import { createApp } from '../app';

const app = createApp();
export const handler = serverless(app);
