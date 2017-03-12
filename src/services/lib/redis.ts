import * as Redis from 'redis';
const client: Redis.RedisClient = Redis.createClient();

client.on("error", (err) => {
    console.error('Error ' + err);
});

export const redis = client;
