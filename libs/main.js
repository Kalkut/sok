var main = function () {
	this.now = Date.now();
	this.delta = this.now - (this.then || 0);

	this.then = this.now;

	
}