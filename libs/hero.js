function Hero (input) {
	

	Array.prototype.add = function () { // add arrays values one by one
		var variables = [];
		if(arguments.length > this.length) return false;
		for(var i = 0, n = arguments[0].length; i < n; i++) {
			variables.push(this[i] + arguments[0][i]);
		}
		return variables;
	}

	Array.prototype.opposite = function() { // change the sign of the values of an array. TO-DO : exception for non-numbers
		return this.map(function (e) { 
			return -e
		})
	}


	this.el = document.createElement('div');
	this.el.className = "hero";
	this.el.style.position = "absolute";

	this.src = input.src || "";

	this.x = input.x || 0;//(0,0) in the upper left corner
	this.y = input.y || 0;

	this.el.style.left = this.x + "px";
	this.el.style.top = this.y + "px";
	
	this.width = input.size || 0;
	this.height = input.size || 0;

	this.el.style.width = this.width + "px";
	this.el.style.height = this.height + "px";

	this.speed = { x : this.width+2	, y : this.height+2 }; // +2 is here because of the borders of the tiles

	this.keys = { 37 : false, 38 : false, 39 : false, 40 : false }
	
	document.body.addEventListener("keyup",function (e) {
		if(e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40){
			this.keys[e.keyCode] = false;
		}else return;
	}.bind(this))

	var left = [-this.width,0];//values to add to the player's position to test the tile at the respective direction
	var right = [2*this.width,0];
	var top = [0,-this.height];
	var bottom = [0,+2*this.height];
	
	var pLeft = [-this.width,0,-this.width,0];// same idea for the push, we need both the coordinates of the tile next to the player and the one behind the tile
	var pRight = [2*this.width,0,2*this.width,0];
	var pTop = [0,-this.height,0,-this.height];
	var pBottom = [0,+2*this.height,0,+2*this.height];
	
	var lrIncrement = [this.width,0];// How much to add/remove to go right/left or down/up
	var btIncrement = [0,this.height];
	var pLrIncrement= [0,0,this.width,0];//same thing for the push
	var pBtIncrement= [0,0,0,this.height];

	var walkable = ["tile","drop"];// walkable classes of tiles
	var pushable = ["crate"];// pushable classes of tiles

	var wTest = function (x,y) {//tests if a tile can be stepped on depending on its coordinates //DRY : prevent copypaste of the same bolean tests
		var a;
		for(var i = 0, n = walkable.length; i < n; i++){
			a = a || (document.elementFromPoint(x,y) && document.elementFromPoint(x,y).className === walkable[i]);
		}
		return a;
	}

	var pTest = function (x,y,xI,yI) {// tests if a crate can be moved depending on its coordinate and the one of the tile we try to push the crate on //DRY : Same thing
		var a;
		var b = true;
		for(var i = 0, n = walkable.length; i < n; i++){
			a = a || (document.elementFromPoint(xI,yI) && document.elementFromPoint(xI,yI).className === walkable[i]);
		}
		for(var k = 0, m = pushable.length; k < m; k++){
			b = b && (document.elementFromPoint(x,y) && document.elementFromPoint(x,y).className === pushable[k]);
		}
		return [b && a,{x : x, y : y},{x : xI, y : yI}]; //["Can I push a crate ?":bool,"From where ?":object,"To where ?":object]
	}

	//Tests if a tile can be stepped on depending on :
	//A basic test function (wTest,pTest)
	//The position of the tile
	// An array representing how much to add to get to the target tile
	//(OPTIONAL) The increment representing how much to add from the target tile to get to the tile behind the target tile
	var fullTest = function (testFunc,position,nextTile,increment) {
		if(!increment) var increment = [0,0];
		return testFunc.curry.apply(testFunc,position.add(nextTile).add(increment))()
	}.bind(this)

	this.handleWalk = function () {//Generates the tests required to know if I'm allowed to move, returns one test (boolean) by direction

		return {//a position variable wouldn't update with this.x and this.y => long ass array instead
			left : fullTest(wTest,[this.x + ( this.el.parentNode ? $(this.el.parentNode).offset().left :0),this.y + (this.el.parentNode ? $(this.el.parentNode).offset().top : 0)],left),
			right : fullTest(wTest,[this.x + ( this.el.parentNode ? $(this.el.parentNode).offset().left :0),this.y + (this.el.parentNode ? $(this.el.parentNode).offset().top : 0)],right),
			top : fullTest(wTest,[this.x + ( this.el.parentNode ? $(this.el.parentNode).offset().left :0),this.y + (this.el.parentNode ? $(this.el.parentNode).offset().top : 0)],top),
			bottom : fullTest(wTest,[this.x + ( this.el.parentNode ? $(this.el.parentNode).offset().left :0),this.y + (this.el.parentNode ? $(this.el.parentNode).offset().top : 0)],bottom)
		}
	}.bind(this)

	this.handlePush = function () {//Generates the tests required to know if I'm allowed to push something
		
		var left = fullTest(pTest,[this.x + ( this.el.parentNode ? $(this.el.parentNode).offset().left :0),this.y + (this.el.parentNode ? $(this.el.parentNode).offset().top : 0),this.x + ( this.el.parentNode ? $(this.el.parentNode).offset().left :0),this.y + (this.el.parentNode ? $(this.el.parentNode).offset().top : 0)],pLeft,pLrIncrement.opposite());
		var right = fullTest(pTest,[this.x + ( this.el.parentNode ? $(this.el.parentNode).offset().left :0),this.y + (this.el.parentNode ? $(this.el.parentNode).offset().top : 0),this.x + ( this.el.parentNode ? $(this.el.parentNode).offset().left :0),this.y + (this.el.parentNode ? $(this.el.parentNode).offset().top : 0)],pRight,pLrIncrement);
		var top = fullTest(pTest,[this.x + ( this.el.parentNode ? $(this.el.parentNode).offset().left :0),this.y + (this.el.parentNode ? $(this.el.parentNode).offset().top : 0),this.x + ( this.el.parentNode ? $(this.el.parentNode).offset().left :0),this.y + (this.el.parentNode ? $(this.el.parentNode).offset().top : 0)],pTop,pBtIncrement.opposite());
		var bottom = fullTest(pTest,[this.x + ( this.el.parentNode ? $(this.el.parentNode).offset().left :0),this.y + (this.el.parentNode ? $(this.el.parentNode).offset().top : 0),this.x + ( this.el.parentNode ? $(this.el.parentNode).offset().left :0),this.y + (this.el.parentNode ? $(this.el.parentNode).offset().top : 0)],pBottom,pBtIncrement);

		return {
			left : {//returns (for each side)
				bool :left[0],// test boolean
				fCrate :left[1],// original position of the crate ( { x : original X, y : original Y})
				nCrate :left[2],// final position of the crate ( { x : final X, y : final Y})
			},
			right : {
				bool :right[0],
				fCrate :right[1],
				nCrate :right[2],
			},
			top : {
				bool :top[0],
				fCrate :top[1],
				nCrate :top[2],
			},
			bottom : {
				bool :bottom[0],
				fCrate :bottom[1],
				nCrate :bottom[2],
			}
		}
	}.bind(this)

	document.body.addEventListener("keydown", function (e){//movement handling (should have avoided using anonymous function here)
		if(e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40){
			this.keys[e.keyCode] = true;
		}else return;

		var walkTest = this.handleWalk();//init tests
		var pushTest = this.handlePush();

		var hash = {37 : "left",38:"top",39:"right",40:"bottom"} // data needed for mapping a keyCode with the tests and values //DRY : No need to copy paste any tests or instructions
		var direction = (e.keyCode == 37 || e.keyCode == 38) ? -1 : 1;
		var leftOrTop = (e.keyCode == 37 || e.keyCode == 39) ? "left" : "top";

		if(walkTest[hash[e.keyCode]]) this.el.style[leftOrTop] = parseInt(this.el.style[leftOrTop]) + direction*this.speed.x + "px";
		if(pushTest[hash[e.keyCode]].bool) {
				var target = document.elementFromPoint(pushTest[hash[e.keyCode]].nCrate.x,pushTest[hash[e.keyCode]].nCrate.y);
				var crate = document.elementFromPoint(pushTest[hash[e.keyCode]].fCrate.x,pushTest[hash[e.keyCode]].fCrate.y);
				target.appendChild(crate);
				this.el.style[leftOrTop] = parseInt(this.el.style[leftOrTop]) + direction*this.speed.x + "px";
		}
		
		this.x = parseInt(this.el.style.left);
		this.y = parseInt(this.el.style.top);
	}.bind(this))
}