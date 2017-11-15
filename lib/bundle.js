/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Player = __webpack_require__(1);
const Game = __webpack_require__(3);

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');

  const game = new Game(canvas,ctx);
  game.update();

});


/***/ }),
/* 1 */
/***/ (function(module, exports) {


const SIZE = 10;

class Player {
  constructor(canvas, ctx){
    this.x = 0;
    this.y = 0;
    this.speed = 3;
    this.left = false;
    this.right = false;
    this.up = false;
    this.down = false;
    this.pickUp = false;
    this.size = SIZE;
    this.basket = [];

    this.move = this.move.bind(this);
    this.draw = this.draw.bind(this);
    this.update = this.update.bind(this);
    this.keyUp = this.keyUp.bind(this);
    this.keyDown = this.keyDown.bind(this);
    this.pickUp = this.pickUp.bind(this);

    this.ctx = ctx;
    this.canvas = canvas;

    this.keyUp();
    this.keyDown();
    this.pickUp();
  }

  move() {
    if (this.left){
      if (this.x - this.speed > 0){
        this.x -= this.speed;
      }
    }
    if (this.right){
      if(this.x + this.speed < this.canvas.width - SIZE){
        this.x += this.speed;
      }
    }
    if (this.up){
      if(this.y - this.speed > 0){
        this.y -= this.speed;
      }
    }
    if (this.down){
      if(this.y + this.speed < this.canvas.height - SIZE){
        this.y += this.speed;
      }
    }
  }

  keyDown() {
    console.log("keydown")
    document.addEventListener('keydown', (e) => {
      if(e.keyCode === 37) this.left = true;
      if(e.keyCode === 39) this.right = true;
      if(e.keyCode === 38) this.up = true;
      if(e.keyCode === 40) this.down = true;
    });
  }

  keyUp() {
    console.log("keyup")
    document.addEventListener('keyup', (e) => {
      if(e.keyCode === 37) this.left = false;
      if(e.keyCode === 39) this.right = false;
      if(e.keyCode === 38) this.up = false;
      if(e.keyCode === 40) this.down = false;
    });
  }

  pickUp() {
    console.log("keypress")
    document.addEventListener('keypress', (e) => {
      if(e.keyCode === 32) this.pickUp = true;
    });
  }

  draw(x, y) {
    this.ctx.fillRect(this.x, this.y, SIZE, SIZE);
  }

  update() {
    this.draw();
    this.move();
  }

}

module.exports = Player;


/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Items = __webpack_require__(4);
const Player = __webpack_require__(1);

class Game {
  constructor(canvas, ctx){
    this.canvas = canvas;
    this.ctx = ctx;
    this.player = new Player(this.canvas, this.ctx);
    this.items = new Items(this.canvas, this.ctx);

    this.update = this.update.bind(this);
    this.clearCanvas = this.clearCanvas.bind(this);
    this.checkCollision = this.checkCollision.bind(this);

    console.log(this.items)
  }

  clearCanvas() {
    this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
  }

  update() {
    this.clearCanvas();
    this.items.draw();
    this.player.update();
    this.checkCollision();
    requestAnimationFrame(this.update);
  }

  checkCollision(){
    this.items.items.forEach(item => {
      if (item.x < this.player.x + this.player.size &&
          item.x + item.size > this.player.x &&
          item.y < this.player.y + this.player.size &&
          item.size + item.y > this.player.y){
        console.log("collision");
      }
      // else {
      //   console.log("no collision")
      // }

    });
  }

}

module.exports = Game;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const Item = __webpack_require__(5);

const SIZE = 30;

const ITEM_TYPES = [
  {
    "name": "Red Grass",
    "price": 100,
    "color": "red"
  },
  {
    "name": "Orange Grass",
    "price": 200,
    "color": "orange"
  },
  {
    "name": "Yellow Grass",
    "price": 300,
    "color": "yellow"
  },
  {
    "name": "Green Grass",
    "price": 400,
    "color": "green"
  },
  {
    "name": "Blue Grass",
    "price": 500,
    "color": "blue"
  },
  {
    "name": "Purple Grass",
    "price": 600,
    "color": "purple"
  }
];

const NUM_ITEMS = 20;

class Items {
  constructor(canvas, ctx){
    this.canvas = canvas;
    this.ctx = ctx;
    this.items = [];

    this.createItems = this.createItems.bind(this);
    this.draw = this.draw.bind(this);

    this.createItems();
  }

  createItems(){
    for(let i = 0; i < NUM_ITEMS; i++){
      let item = ITEM_TYPES[Math.floor(Math.random() * ITEM_TYPES.length)];
      let x = Math.floor(Math.random() * this.canvas.width - SIZE);
      let y = Math.floor(Math.random() * this.canvas.height - SIZE);
      item["x"] = x;
      item["y"] = y;
      item["ctx"] = this.ctx;
      this.items.push(new Item(item));
    }
  }

  draw(){
    this.items.forEach(item => {
      item.draw();
    });
  }

}

module.exports = Items;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

const SIZE = 30;
const SIZE_INNER = 10;

class Item {
  constructor(options){
    this.name = options.name;
    this.price = options.price;
    this.color = options.color;
    this.x = options.x;
    this.y = options.y;
    this.size = SIZE;
    this.ctx = options.ctx;
  }

  draw(x, y) {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, SIZE, SIZE);
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(this.x + ((SIZE - SIZE_INNER) / 2), this.y + ((SIZE - SIZE_INNER) / 2), SIZE_INNER, SIZE_INNER);
  }

}

module.exports = Item;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map