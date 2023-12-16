import type { RedisClientType } from '@node-redis/client';

export const setString = async (client: RedisClientType) => {
  const key = 'name';
  const response = await client.set(key, 'Andy');
  console.log('set response: ', response);
  const value = await client.get(key);
  console.log('get value: ', value);
}


export const setEX = async (client: RedisClientType) => {
  const key = 'age';

}
