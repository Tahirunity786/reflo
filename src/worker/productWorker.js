import { Worker } from 'bullmq';
import IORedis from 'ioredis';

const connection = new IORedis();

const worker = new Worker('productQueue', async (job) => {
  const { productId } = job.data;
  // Background logic like inventory sync, email, etc.
  console.log('Processing product job:', productId);
}, { connection });

worker.on('completed', (job) => {
  console.log(`Job ${job.id} completed!`);
});