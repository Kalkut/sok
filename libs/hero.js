function Hero (input) {
	
	this.el = document.createElement('div');
	this.el.className = "hero";
	this.el.style.position = "absolute";

	this.src = input.src || "";

	this.x = input.x || 0;
	this.y = input.y || 0;

	this.el.style.left = this.x + "px";
	this.el.style.top = this.y + "px";
	
	this.width = input.width || 0;
	this.height = input.height || 0;

	this.speed = input.speed || { x : 0, y : 0 };

	this.keys = { 37 : false, 38 : false, 39 : false, 40 : false }
	
	document.body.addEventListener("keyup",function (e) {
		if(e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40){
			this.keys[e.keyCode] = false;
		}else return;
	}.bind(this))

	document.body.addEventListener("keydown", function (e){
		if(e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40){
			this.keys[e.keyCode] = true;
		}else return;

		//console.log(document.elementFromPoint(this.x+25-this.speed.x,this.y+25),);
		if(this.keys[37] && document.elementFromPoint(this.x+25-this.speed.x,this.y+25)  ) {
			if(document.elementFromPoint(this.x+25-this.speed.x,this.y+25).className === "tile") this.el.style.left = parseInt(this.el.style.left) - this.speed.x + "px";
			if(document.elementFromPoint(this.x+25-this.speed.x,this.y+25).className === "crate" && document.elementFromPoint(this.x+25-this.speed.x-30,this.y+25).className === "tile") console.log(document.elementFromPoint(this.x+25-this.speed.x-30,this.y+25));
		}
		else if(this.keys[38] && document.elementFromPoint(this.x+25,this.y+25-this.speed.x) && document.elementFromPoint(this.x+25,this.y+25-this.speed.x).className === "tile") this.el.style.top = parseInt(this.el.style.top) - this.speed.y + "px";
		else if(this.keys[39] && document.elementFromPoint(this.x+25+this.speed.x,this.y+25) && document.elementFromPoint(this.x+25+this.speed.x,this.y+25).className === "tile") this.el.style.left = parseInt(this.el.style.left) + this.speed.x + "px";
		else if(this.keys[40] && document.elementFromPoint(this.x+25,this.y+25+this.speed.x) && document.elementFromPoint(this.x+25,this.y+25+this.speed.x).className === "tile") this.el.style.top = parseInt(this.el.style.top) + this.speed.y + "px";

		
		this.x = parseInt(this.el.style.left);
		this.y = parseInt(this.el.style.top);

		

	}.bind(this))

}