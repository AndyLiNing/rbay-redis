import { sessionKey } from "$services/keys";
import { client } from "$services/redis";
import type { Session } from '$services/types';


// Note1
// Session info is the hash structure as below
// session#sesionId : {
//  userId: 123,
//  username: 'test'
// }

export const getSession = async (id: string) => {
  const session = await client.hGetAll(sessionKey(id))
  const exist = Object.keys(session).length > 0;
  if(!exist) {
    throw new Error('No session exist for this user')
  }

  return deserialize(id, session as StoredSession)
};

export const saveSession = async (session: Session) => {
  const { id } = session;
  await client.hSet(sessionKey(id), serialize(session))
};

const serialize = (session: Session): StoredSession => {
  const {userId, username} = session;
  return {
    userId,
    username
  }
}

const deserialize = (id: string, storedSession: StoredSession) => {
    const {userId, username} = storedSession;
    return {
      id,
      userId,
      username
    }
}

type StoredSession = Pick<Session, 'userId' | 'username'>
