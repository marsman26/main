const http = require('http');

const Router = require('./router/index')

class Server extends Router {
	server;
	constructor() {
		super()
		this.server = this.startServer();
	}

	startServer() {
		return http.createServer((req, res) => {
			this.handler(req, res);
		})
	}

	listen(port, callback) {
		if(arguments[arguments.length - 1]) {
			callback();
		}
		this.server.listen(port);
	}
}

module.exports = Server;