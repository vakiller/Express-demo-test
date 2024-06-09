const redis = require('redis');
const dotenv = require('dotenv');

const clientRedis = redis.createClient({ url: `${process.env.REDIS_HOST}:${process.env.REDIS_PORT}` });

const connectRedis = async () => {
    try {
        await clientRedis.connect();
        console.log('Connected to Redis');
    } catch (err) {
        console.error('Redis connection error: ', err);
    }
};

clientRedis.on('error', (err) => {
    console.error('Redis error: ', err);
});

module.exports = { clientRedis, connectRedis };