import { userKey, USERNAMES_KEY } from "$services/keys";
import { client } from "$services/redis";
import type { CreateUserAttrs } from '$services/types';
import { genId } from "$services/utils";

// Note1:
// User info will be stored in Hash structure
// users#Id: {
//   username: string;
//   password: string;
// }

// Note2:
// Username info is stored in a Set
// As the test the uniqueness of username


export const getUserByUsername = async (username: string) => {};

export const getUserById = async (id: string) => {
  const user = await client.hGetAll(userKey(id));
  const found = Object.keys(user).length > 0;
  if (!found) {
    throw new Error('Username not found');
  }
  return deserialize(id, user as unknown as CreateUserAttrs)
};

export const createUser = async (attrs: CreateUserAttrs) => {
  const id = genId();
  const { username } = attrs;
  const exist = await client.sIsMember(USERNAMES_KEY, username);
  if (exist) {
    throw new Error('Username is taken');
  }
  await client.hSet(userKey(id), serialize(attrs));
  await client.sAdd(USERNAMES_KEY, username)

  return id;
};

const serialize = (attrs: CreateUserAttrs) => {
  const { username, password} = attrs
  return { username, password }
}

const deserialize = (id: string, user: CreateUserAttrs) => {
  return {
    id,
    ...user
  }
}
