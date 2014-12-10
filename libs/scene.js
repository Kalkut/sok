function Scene (input) {
	
	

	this.currentLevel = input.level || [[0,0,0,0,0,0],[0,0,0,"crate",0,0],[0,"wall",0,0,0,0],[0,"wall","wall",0,"crate",0],[0,0,"crate",0,"drop","drop"],[0,"crate",0,0,"drop","drop"]]

	this.width = input.width || this.currentLevel[0].length;
	this.height = input.height || this.currentLevel.length;

	var tile;
	var lineContainer;
	this.el = document.createElement("div");
	this.el.className = "scene";

	this.el.style.width = parseInt(this.tWidth)*this.width+2*this.width+1;
	this.el.style.height = parseInt(this.tHeight)*this.height+2*this.height+1;

	this.tWidth = input.tWidth || "50px";
	this.tHeight = input.tHeight || "50px";

	this.player = input.player;
	this.el.appendChild(this.player.el);

	this.panel = document.createElement('div');
	this.panel.className = "panel";


	for(var i = 0, n = this.height; i < n; i++){//Fill the scene with tiles with given coordinates
		var lineContainer = document.createElement("div");
		lineContainer.className = "line-container";

		for(var k = 0, m = this.width; k < m; k++){
			
			tile = document.createElement("div");
			tile.className = "tile";
			
			tile.setAttribute("coord","("+k+","+i+")");
			tile.setAttribute("x",k);
			tile.setAttribute("y",i);
			
			tile.style.width = this.tWidth;
			tile.style.height = this.tHeight;
			
			lineContainer.appendChild(tile);
		}
		this.el.appendChild(lineContainer);
	}

	this.initLevel = function () {//Fill the scene accordingly to the currentLevel:Array (see l:5)
		for(var i = 0, n = this.currentLevel.length; i < n; i++){
			for(var k = 0, m = this.currentLevel[i].length; k < m; k++){
				if($("[coord='("+k+","+i+")']")[0].childNodes.length) $("[coord='("+k+","+i+")']")[0].removeChild($("[coord='("+k+","+i+")']")[0].childNodes[0]);
				if(this.currentLevel[i][k]) {
					if(this.currentLevel[i][k] == "hero"){
						this.player.el.style.left = $("[coord='("+k+","+i+")']").position().left + "px";
						this.player.el.style.top = $("[coord='("+k+","+i+")']").position().top + "px";
						this.player.x = parseInt(this.player.el.style.left);
						this.player.y = parseInt(this.player.el.style.top);
					}
					var crate = document.createElement("div");
					crate.className = this.currentLevel[i][k];
					$("[coord='("+k+","+i+")']")[0].appendChild(crate);
				}
			}
		}
	}
}