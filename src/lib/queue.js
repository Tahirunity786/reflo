// lib/queue.js
import { Queue } from 'bullmq';
import IORedis from 'ioredis';

const connection = new IORedis(); // configure Redis connection
export const productQueue = new Queue('productQueue', { connection });
