import type { RedisClientType } from '@node-redis/client';

// Hash structure example => [key, {filed1: value1,filed2: value2, filed3: value3, filed4: value4 }];

// When to use hashes
// 1, The record has many attributes
// 2, Need to sort record by different criteria
// 3,
export const hash = async (client: RedisClientType) => {
  const key = 'car';
  const response = await client.hSet(key, {
    made: 'BMW',
    model: 'X1 xDrive25e',
    year: '2023',
    // TypeError: Cannot read properties of undefined (reading 'toString')
    // mileage: undefined
  });
  console.log('set response: ', response);

  const hGetAll = await client.hGetAll(key);
  const hGetModel = await client.hGet(key, 'model');

  console.log('get hGetAll: ', hGetAll);
  console.log('get hGetModel: ', hGetModel);
}



