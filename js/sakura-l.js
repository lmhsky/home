var stop, staticx, img = new Image;

function Sakura(x, y, s, r, fn) {
	this.x = x, this.y = y, this.s = s, this.r = r, this.fn = fn
}

function getRandom(option) {
	var ret, random;
	switch (option) {
		case "x":
			ret = Math.random() * window.innerWidth;
			break;
		case "y":
			ret = Math.random() * window.innerHeight;
			break;
		case "s":
			ret = Math.random();
			break;
		case "r":
			ret = 6 * Math.random();
			break;
		case "fnx":
			random = 1 * Math.random() - .5, ret = function(x, y) {
				return x + .5 * random - 1.7
			};
			break;
		case "fny":
			random = 1.5 + .7 * Math.random(), ret = function(x, y) {
				return y + random
			};
			break;
		case "fnr":
			random = .03 * Math.random(), ret = function(r) {
				return r + random
			}
	}
	return ret
}

function startSakura() {
	requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame;
	var canvas = document.createElement("canvas"),
		cxt;
	staticx = !0, canvas.height = window.innerHeight, canvas.width = window.innerWidth, canvas.setAttribute("style", "position: fixed;left: 0;top: 0;pointer-events: none;"), canvas.setAttribute("id", "canvas_sakura"), document.getElementsByTagName("body")[0].appendChild(canvas), cxt = canvas.getContext("2d");
	for (var sakuraList = new SakuraList, i = 0; i < 1; i++) {
		var sakura, randomX, randomY, randomS, randomR, randomFnx, randomFny;
		randomX = getRandom("x"), randomY = getRandom("y"), randomR = getRandom("r"), randomS = getRandom("s"), randomFnx = getRandom("fnx"), randomFny = getRandom("fny"), randomFnR = getRandom("fnr"), (sakura = new Sakura(randomX, randomY, randomS, randomR, {
				x: randomFnx,
				y: randomFny,
				r: randomFnR
			}))
			.draw(cxt), sakuraList.push(sakura)
	}
	stop = requestAnimationFrame((function() {
		cxt.clearRect(0, 0, canvas.width, canvas.height), sakuraList.update(), sakuraList.draw(cxt), stop = requestAnimationFrame(arguments.callee)
	}))
}

// function stopp() {
// 	if (staticx) {
// 		var child = document.getElementById("canvas_sakura");
// 		child.parentNode.removeChild(child), window.cancelAnimationFrame(stop), staticx = !1
// 	} else {
// 		startSakura()
// 	}
// }

// 动画：飘下来的图片
img.src = "data:image/png;base64,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",

Sakura.prototype.draw = function(cxt) {
	cxt.save();
	// var xc = 100 * this.s / 4;
	cxt.translate(this.x, this.y), cxt.rotate(this.r), cxt.drawImage(img, 0, 0, 80 * this.s, 80 * this.s), cxt.restore()
}, Sakura.prototype.update = function() {
	this.x = this.fn.x(this.x, this.y), this.y = this.fn.y(this.y, this.y), this.r = this.fn.r(this.r), (this.x > window.innerWidth || this.x < 0 || this.y > window.innerHeight || this.y < 0) && (this.r = getRandom("fnr"), Math.random() > .4 ? (this.x = getRandom("x"), this.y = 0, this.s = getRandom("s"), this.r = getRandom("r")) : (this.x = window.innerWidth, this.y = getRandom("y"), this.s = getRandom("s"), this.r = getRandom("r")))
}, SakuraList = function() {
	this.list = []
}, SakuraList.prototype.push = function(sakura) {
	this.list.push(sakura)
}, SakuraList.prototype.update = function() {
	for (var i = 0, len = this.list.length; i < len; i++) 
		this.list[i].update()
}, SakuraList.prototype.draw = function(cxt) {
	for (var i = 0, len = this.list.length; i < len; i++) 
		this.list[i].draw(cxt)
}, SakuraList.prototype.get = function(i) {
	return this.list[i]
}, SakuraList.prototype.size = function() {
	return this.list.length
}, window.onresize = function() {
	// var canvasSnow = document.getElementById("canvas_snow")
}, img.onload = function() {
	startSakura()
};



