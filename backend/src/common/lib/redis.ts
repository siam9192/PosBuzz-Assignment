import { createClient } from 'redis';

const redisClient = createClient({
  url: 'redis://default:lbhKuluFTRmRO0n73MarYpj9Cm3TeoLL@redis-19003.c252.ap-southeast-1-1.ec2.cloud.redislabs.com:19003',
});

redisClient.on('error', (err) => console.error('Redis Error', err));

export default redisClient;
