import { itemKey } from "$services/keys";
import type { CreateItemAttrs } from '$services/types';

import { client } from '$services/redis/client'
import { genId } from "$services/utils";
import { DateTime } from "luxon";

// Note1 item data structure
// items#id: {
// ...
// }

// Note2 Pipelining commands


export const getItem = async (id: string) => {
  const item = await client.hGetAll(itemKey(id));

  if(Object.keys(item).length < 1) {
    throw new Error('Item not found');
  }
  return deserialize(id, item as unknown as SerializedType);
};

export const getItems = async (ids: string[]) => {
    const commands = ids.map((id) => {
        return client.hGetAll(itemKey(id))
    });

    const items  = await Promise.all(commands) as unknown as SerializedType[];
    return items.map((item, i) => {
      if (Object.keys(item).length === 0) {
        return null;
      }
      return deserialize(ids[i], item);
    });
};

export const createItem = async (attrs: CreateItemAttrs) => {
    const id = genId();
    await client.hSet(itemKey(id), serialize(attrs));
    return id;
};


const serialize = (attrs: CreateItemAttrs): SerializedType => {

  const {createdAt, endingAt,views, likes, bids, price} = attrs;
  return {
    ...attrs,
    createdAt: createdAt.toMillis(),
    endingAt: endingAt.toMillis(),
    views: views.toString(),
    likes: likes.toString(),
    bids: bids.toString(),
    price: bids.toString(),
  }
}

const deserialize = (id: string, attrs: SerializedType): DeserializedType   => {

  const {createdAt, endingAt, views, likes, bids, price} = attrs

  return {
    id,
    ...attrs,
    createdAt: DateTime.fromSeconds(createdAt/1000),
    endingAt: DateTime.fromSeconds(endingAt/1000),
    views: parseInt(views),
    likes: parseInt(likes),
    bids: parseInt(bids),
    price: parseFloat(price)
  }
}

type SerializedType = Omit<CreateItemAttrs, 'createdAt' | 'endingAt' | 'views' | 'likes' | 'bids'| 'price'>
  & {
  createdAt: number;
  endingAt: number;
  views: string;
  likes: string;
  bids: string;
  price: string;
}

type DeserializedType = CreateItemAttrs & { id: string}
