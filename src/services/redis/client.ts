import { createClient } from 'redis';

const client = createClient({
	socket: {
		host: process.env.REDIS_HOST,
		port: parseInt(process.env.REDIS_PORT)
	},
	password: process.env.REDIS_PW
});

client.on('error', (err) => console.error(err));
client.connect();
const consoleLog =() => {
	console.log('******************************* Redis Info Start **************************************')
	console.log('process.env.REDIS_HOST', process.env.REDIS_HOST)
	console.log('process.env.REDIS_PORT', process.env.REDIS_PORT)
	console.log('process.env.REDIS_PW', process.env.REDIS_PW)
	console.log('******************************* Redis Info End **************************************')
}
consoleLog();
export { client };
