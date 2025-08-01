import { Job, Queue, RedisConnection, Worker } from "bullmq";
import { defaultQueueOtions, redisConnectionOptions } from "../config/queue.js";

import prisma from "../config/database.js";

export const commentQueueName = "commentQueue";

export const commentQueue = new Queue(commentQueueName, {
  connection: redisConnectionOptions,
  defaultJobOptions: {
    ...defaultQueueOtions,
    delay: 1000,
  },
});

export const queueWorker = new Worker(
  commentQueueName,
  async (job: Job<CommentData>) => {
    const data: CommentData = job.data;
    await prisma.clashComments.create({
      data: {
        comment: data?.comment,
        clash_id: Number(data?.id),
        created_at: new Date(),
      },
    });
  },
  {
    connection: redisConnectionOptions,
  }
);
