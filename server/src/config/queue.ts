import {ConnectionOptions,DefaultJobOptions} from 'bullmq';
export const redisConnectionOptions: ConnectionOptions = {
    host: process.env.REDIS_HOST,
    port: 6379,


}                

export const defaultQueueOtions: DefaultJobOptions = {
    removeOnComplete:{
        count:20,
        age:60*60,

    },
    attempts:5,
    backoff:{
        type:'exponential',
        delay:3000,
    },
}
