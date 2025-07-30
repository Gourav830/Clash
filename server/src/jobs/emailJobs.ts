import { Job, Queue, RedisConnection, Worker } from "bullmq";
import { defaultQueueOtions, redisConnectionOptions } from "../config/queue.js";
import { sendEmail } from "../config/mail.js";

export const emailQueueName = "emailQueue";
interface EmailJobDataType {
  to: string;
  subject: string;
  body: string;
}
export const emailQueue = new Queue(emailQueueName, {
  connection: redisConnectionOptions,
  defaultJobOptions: defaultQueueOtions,
});

export const queueWorker = new Worker(
  emailQueueName,
  async (job: Job) => {
    const data = job.data;
    await sendEmail(data.to, data.subject, data.body);
  },
  {
    connection: redisConnectionOptions,
  }
);
