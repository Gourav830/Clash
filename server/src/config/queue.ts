import { QueueOptions, DefaultJobOptions } from "bullmq";

export const redisConnectionOptions = {
  host: "promoted-guinea-52644.upstash.io",
  port: 6379,
  password: "Ac2kAAIjcDFlZTE1M2E0YTQ0OTM0YWVmYjNhZmUwMjhjYmE0ZGM0NHAxMA",
  username: "default",
  tls: {},
};

export const defaultQueueOtions: DefaultJobOptions = {
  removeOnComplete: {
    count: 20,
    age: 60 * 60,
  },
  attempts: 5,
  backoff: {
    type: "exponential",
    delay: 3000,
  },
  removeOnFail: false,
};
