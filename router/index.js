class Router {
	handlerHub = [];
	middleHub = [];
	constructor() {
		this.handlerHub = [];
		this.middleHub = [];
	}
	
	get(url, callback) {
		this.handlerHub.push({method: 'GET', url, callback});
	}
	
	post(url, callback) {
		this.handlerHub.push({method: 'POST', url, callback});
	}
	
	patch(url, callback) {
		this.handlerHub.push({method: 'PATCH', url, callback});
	}
	
	put(url, callback) {
		this.handlerHub.push({method: 'PUT', url, callback});
	}

	delete(url, callback) {
		this.handlerHub.push({method: 'DELETE', url, callback});
	}

	use(url, handler) {
		if(typeof handler === 'object') {
			handler.url = url;
			this.middleHub.push(handler);
			return
		}
		this.middleHub.push({url, handler})
	}

	handler(req, res) {
		console.log(req.method);
		try {
			const handlerCallback = this.handlerHub.find(e => e.url === req.url && e.method === req.method);
			handlerCallback.callback(req, res);
		} catch(e) {
			console.log('ERROR ROUTER');
		}

		try {
			const middleCallback = this.middleHub.find(e => {
				const l = e.url.length;
				return e.url === req.url.substr(0, l);
			});
			req.url = req.url.replace(middleCallback.url, '');
			middleCallback.handler(req, res);
		} catch(e) {
			console.log('ERROR MIDDLE');
		}
	
	}
}

module.exports = Router;