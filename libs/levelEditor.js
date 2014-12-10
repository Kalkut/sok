function LevelEditor (input) {

	Function.prototype.curry = function () { //Tasty and spicy partial evaluation function. Shortcut for multiples closures
		var self = this;
		var args = Array.prototype.slice.call(arguments);
		return function () {
			return self.apply([], args.concat(Array.prototype.slice.call(arguments)));
		}
	}

	this.el = document.createElement('div');
	this.el.className = "LevelEditor";
	
	this.width = input.width || 1;
	this.height = input.height || 1;

	this.tWidth = input.tWidth || "50px";
	this.tHeight = input.tHeight || "50px";

	this.el.style.width = parseInt(this.tWidth)*this.width+2*this.width+1;
	this.el.style.height = parseInt(this.tHeight)*this.height+2*this.height+1;

	var playerPin = document.createElement('div');
	playerPin.className = "hero";

	for(var i = 0, n = this.width; i < n; i++) {
		for(var k = 0, m = this.height; k < m; k++) {
			
			var tile = document.createElement('div');
			tile.className = "tile";
			tile.style.width = this.tWidth;
			tile.style.height = this.tHeight;
			this.el.appendChild(tile);

			tile.onmouseup = function (pTile) {//click event to put an item on the grid
				if(pTile.childNodes.length) pTile.removeChild(pTile.childNodes[0]);
				if(this.currentTool === "hero") pTile.appendChild(playerPin);
				else if(this.currentTool != "tile"){
					var add = document.createElement('div');
					add.className = this.currentTool;
					pTile.appendChild(add);
				}
			}.bind(this).curry(tile)

		}
	}

	this.panel = document.createElement('div');
	this.panel.className = "panel";

	var wall = document.createElement('div');// Have to be factorized
	var player = document.createElement('div');
	var crate = document.createElement('div');
	var drop = document.createElement('div');
	var cleanTile = document.createElement('div');
	
	wall.className = "wall";// Have to be factorized
	player.className = "hero";
	crate.className = "crate";
	drop.className = "drop";
	cleanTile.className = "tile";

	this.panel.appendChild(player);// Have to be factorized
	this.panel.appendChild(cleanTile);
	this.panel.appendChild(wall);
	this.panel.appendChild(crate);
	this.panel.appendChild(drop);

	var that = this // Need BOTH scope of this in next function so no bind 

	player.onmouseup = wall.onmouseup = cleanTile.onmouseup = drop.onmouseup = crate.onmouseup = function (e) {
		if(this.className.search(" selected") < 0) {
			that.currentTool = this.className;
			this.className += " selected";
		}
	}

	this.panel.addEventListener("mouseup", function  (e) {//to factorize in one line (use a hash)
		wall.className = wall.className.replace(" selected","");
		crate.className = crate.className.replace(" selected","");
		drop.className = drop.className.replace(" selected","");
		cleanTile.className = cleanTile.className.replace(" selected","");
		player.className = player.className.replace(" selected","");
	}.bind(this),true)

	this.saveLevel = function () {
		var level = [];
		for(var i = 0, n = this.el.childNodes.length; i < n; i++) {
			if(i%this.width == 0){
				if(!line && line !=0) {
					var line = 0;
				}else {
					line++;
				}
				level.push([]);
			}

			if(this.el.childNodes[i].childNodes.length)level[line].push(this.el.childNodes[i].childNodes[0].className);
			else level[line].push(0);
			}
			return level;
		}

		this.loadLevel = function() {//I'm not lazy, I swear !

		}

		this.reset = function () {
			for(var i = 0, n = this.el.childNodes.length; i < n; i++) {
				if(this.el.childNodes[i].childNodes.length) this.el.childNodes[i].removeChild(this.el.childNodes[i].childNodes[0]);
			}
		}
		
	}