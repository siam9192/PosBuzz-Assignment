import { createClient } from 'redis';
import envConfig from './envConfig';

const redisClient = createClient({
  url: envConfig.url.redis_db,
});

redisClient.on('error', (err) => console.error('Redis Error', err));

export default redisClient;
