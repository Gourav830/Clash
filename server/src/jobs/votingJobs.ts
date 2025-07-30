import { Job, Queue, RedisConnection, Worker } from "bullmq";
import { defaultQueueOtions, redisConnectionOptions } from "../config/queue.js";

import prisma from "../config/database.js";

export const votingQueueName = "votingQueue";

export const votingQueue = new Queue(votingQueueName, {
  connection: redisConnectionOptions,
  defaultJobOptions: {
    ...defaultQueueOtions,
    delay:500
  },
});

export const queueWorker = new Worker(
  votingQueueName,
  async (job: Job) => {
    const data = job.data;
    await prisma.clashItem.update({
      where: {
        id: Number(data?.clashItemId),
      },
      data:{
        count:{
            increment:1
        }
      }
    });
  },
  {
    connection: redisConnectionOptions,
  }
);
