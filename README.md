# REST API simple Node.js HTTP routing without frameworks.

##How to use:

	const Server = require('./main/server');
	const server = new Server();

	server.get('/', (req, res) => {
		res.end('Hello World!');
	});

	server.listen(3000, () => console.log('Server is running!'));

## Router
	// post.js

	const Router = require('./main/router');
	const router = new Router();

	router.get('/', (req, res) => {
		res.end('Hello World!');
	})

	module.exports = router;

## Handlers
	
	const Server = require('./main/server');
	const server = new Server();

	const postRouter = require('post.js');

	server.use('/api', postRouter);

	server.listen(3000); 
