import 'dotenv/config';
import { client } from '../src/services/redis';


import { hash } from "./data-type/hash";

import { setString } from "./data-type/string";

const run = async () => {
  await hash(client as any);
};

run();

