import { createClient } from 'redis';

const redisClient = createClient();

redisClient.connect().catch(console.error);

redisClient.on('connect', () => {
    console.log('Connected to Redis');
});
redisClient.on('error', (err) => {
    console.error('Redis Client Error', err);
});

export default redisClient;
