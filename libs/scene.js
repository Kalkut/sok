function Scene (input) {
	
	this.width = input.width || 0;
	this.height = input.height || 0;
	this.tileSize = input.tileSize || 0;

	this.currentLevel = input.level || [[0,0,0,"crate",0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,"crate",0,0,0],[0,0,0,0,0,0]]

	var tile;
	var lineContainer;
	this.el = document.createElement("div");
	this.el.className = "scene";

	for(var i = 0, n = this.height; i < n; i++){
		var lineContainer = document.createElement("div");
		lineContainer.className = "line-container";

		for(var k = 0, m = this.width; k < m; k++){
			tile = document.createElement("div");
			tile.className = "tile";
			tile.setAttribute("coord","("+k+","+i+")");
			tile.setAttribute("x",k);
			tile.setAttribute("y",i);
			lineContainer.appendChild(tile);
		}
		this.el.appendChild(lineContainer);
	}

	this.initLevel = function () {
		for(var i = 0, n = this.currentLevel.length; i < n; i++){
			for(var k = 0, m = this.currentLevel[i].length; k < m; k++){
				if(this.currentLevel[i][k]) {
					var crate = document.createElement("div");
					crate.className = this.currentLevel[i][k];
					$("[coord='("+i+","+k+")']")[0].appendChild(crate);
				}
			}
		}
	}

}