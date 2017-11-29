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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Items = __webpack_require__(1);

const SIZE = 10;

class Player {
  constructor(canvas, ctx, shipContainer){
    this.ctx = ctx;
    this.canvas = canvas;

    this.x = 0;
    this.y = 0;
    this.speed = 3;
    this.left = false;
    this.right = false;
    this.up = false;
    this.down = false;
    this.pickUpItem = undefined;
    this.size = SIZE;
    this.backpack = {};
    this.wallet = 0;
    this.items = new Items(this.canvas, this.ctx);
    this.collision = false;
    this.shipContainer = shipContainer;
    this.enterShipContainer = false;

    this.move = this.move.bind(this);
    this.draw = this.draw.bind(this);
    this.update = this.update.bind(this);
    this.keyUp = this.keyUp.bind(this);
    this.keyDown = this.keyDown.bind(this);
    this.checkCollision = this.checkCollision.bind(this);
    this.pickUp = this.pickUp.bind(this);
    this.displayBackpack = this.displayBackpack.bind(this);
    this.removeItemFromField = this.removeItemFromField.bind(this);
    this.checkShipContainerCollision = this.checkShipContainerCollision.bind(this);


    this.keyUp();
    this.keyDown();
    this.checkCollision();
    this.checkShipContainerCollision();
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
    document.addEventListener('keydown', (e) => {
      if(e.keyCode === 37) this.left = true;
      if(e.keyCode === 39) this.right = true;
      if(e.keyCode === 38) this.up = true;
      if(e.keyCode === 40) this.down = true;
      if(e.keyCode === 32) this.pickUp();
      if(e.keyCode === 66) this.displayBackpack();
    });
  }

  keyUp() {
    document.addEventListener('keyup', (e) => {
      if(e.keyCode === 37) this.left = false;
      if(e.keyCode === 39) this.right = false;
      if(e.keyCode === 38) this.up = false;
      if(e.keyCode === 40) this.down = false;
    });
  }


  draw(x, y) {
    this.ctx.fillRect(this.x, this.y, SIZE, SIZE);
  }


  checkCollision(){
    this.pickUpItem = undefined;
    this.items.items.forEach(item => {
      if (item.x < this.x + this.size &&
          item.x + item.size > this.x &&
          item.y < this.y + this.size &&
          item.size + item.y > this.y){
        this.pickUpItem = item;
      }
    });
    requestAnimationFrame(this.checkCollision);
  }

  checkShipContainerCollision(){
    this.shipContainer.hide();
    if (this.x < this.shipContainer.x + this.shipContainer.size &&
      this.x + this.size > this.shipContainer.x &&
      this.y < this.shipContainer.y + this.shipContainer.size &&
      this.size + this.y > this.shipContainer.y){
        this.shipContainer.show(this.backpack);
        cancelAnimationFrame(this.checkShipContainerCollision);
        this.x = 100;
        this.y = 100;
    } else {
      this.shipContainer.hide();
      requestAnimationFrame(this.checkShipContainerCollision);
    }
  }

  removeItemFromField(){
    for(let i = 0; i < this.items.items.length; i++){
      if (this.items.items[i].id === this.pickUpItem.id){
        this.items.items.splice(i, 1);
        if($('.backpack').hasClass("backpack-show")){
          $('.backpack').removeClass("backpack-show");
          this.displayBackpack();
        }
      }
    }
  }

  pickUp(){
    if(this.pickUpItem !== undefined){
      if(this.backpack[this.pickUpItem.name]){
        this.backpack[this.pickUpItem.name].count ++ ;
      } else {
        this.backpack[this.pickUpItem.name] = this.pickUpItem["count"] = 1;
        this.backpack[this.pickUpItem.name] = this.pickUpItem;
      }
      this.removeItemFromField();
    }
    this.pickUpItem = undefined;
    console.log(this.backpack);
  }

  displayBackpack(){
    let $backpack = $('.backpack');
    if($backpack.hasClass("backpack-show")){
      $backpack.removeClass("backpack-show");
    } else {
      $backpack.addClass("backpack-show");
    }

    let $backpackUl = $('.backpack-ul');
    $backpackUl.empty();
    Object.keys(this.backpack).forEach(item => {
      let $itemImg = $('<div>').css({
        "height": "25px",
        "width": "25px",
        "background-image": `url(${this.backpack[item].imageSrc})`,
        "background-position": `${418-this.backpack[item].srcPos[0]}px ${750-this.backpack[item].srcPos[1]}px`
      });
      let $itemQty = $('<div>').addClass("backpack-item-price").html(`${this.backpack[item].count}`);
      $backpackUl.append($('<li>').append($itemImg).append($itemQty));
    });
  }

  update() {
    this.draw();
    this.move();
  }

}

module.exports = Player;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Item = __webpack_require__(3);

const SIZE = 30;

const ITEM_TYPES = [
  {
    "name": "Wood",
    "className": "wood",
    "price": 10,
    "srcPos": [30, 614]
  },
  {
    "name": "Rock",
    "className": "rock",
    "price": 10,
    "srcPos": [30, 560]
  },
  {
    "name": "Brown Mushroom",
    "className": "brown-mushroom",
    "price": 70,
    "srcPos": [114, 114]
  },
  {
    "name": "Big Brown Mushroom",
    "className": "big-brown-mushroom",
    "price": 150,
    "srcPos": [58, 114]
  },
  {
    "name": "Yellow Flower",
    "className": "yellow-flower",
    "price": 50,
    "srcPos": [308, 530]
  },
  {
    "name": "Blue Flower",
    "className": "blue-flower",
    "price": 50,
    "srcPos": [366, 530]
  },
  {
    "name": "Red Flower",
    "className": "red-flower",
    "price": 50,
    "srcPos": [393, 530]
  },
  {
    "name": "Pink Flower",
    "className": "pink-flower",
    "price": 50,
    "srcPos": [336, 530]
  },
  {
    "name": "Weed",
    "className": "weed",
    "price": 10,
    "srcPos": [366, 586]
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Player = __webpack_require__(0);
const Game = __webpack_require__(4);

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');

  const game = new Game(canvas,ctx);
  game.update();

});


/***/ }),
/* 3 */
/***/ (function(module, exports) {

const SIZE_OUTTER = 30;
const SIZE_INNER = 25;

class Item {
  constructor(options){
    this.id = `${options.x}${options.y}`;
    this.name = options.name;
    this.className = options.className;
    this.price = options.price;
    // this.color = options.color;
    this.ctx = options.ctx;
    this.x = options.x;
    this.y = options.y;
    this.size = SIZE_OUTTER;
    this.srcPos = options.srcPos;
    this.imageSrc = "./images/items.png ";
    this.image = new Image();
    this.image.src = "./images/items.png ";
  }

  draw(x, y) {
    // this.ctx.fillStyle = "red";
    // this.ctx.fillRect(this.x, this.y, SIZE_OUTTER, SIZE_OUTTER);
    // this.ctx.fillStyle = "black";
    // this.ctx.fillRect(this.x + ((SIZE - SIZE_INNER) / 2), this.y + ((SIZE - SIZE_INNER) / 2), SIZE_INNER, SIZE_INNER);
    this.ctx.drawImage(this.image, this.srcPos[0], this.srcPos[1], 22, 22,
    this.x + ((SIZE_OUTTER - SIZE_INNER) / 2),
    this.y + ((SIZE_OUTTER - SIZE_INNER) / 2),
    SIZE_INNER, SIZE_INNER);
  }

}

module.exports = Item;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const Items = __webpack_require__(1);
const Player = __webpack_require__(0);
const Store = __webpack_require__(5);
const ShipContainer = __webpack_require__(6);

class Game {
  constructor(canvas, ctx){
    this.canvas = canvas;
    this.ctx = ctx;
    this.shipContainer = new ShipContainer(this.ctx);
    this.player = new Player(this.canvas, this.ctx, this.shipContainer);
    this.store = new Store(this.ctx);

    this.update = this.update.bind(this);
    this.clearCanvas = this.clearCanvas.bind(this);
  }

  clearCanvas() {
    this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
  }

  update() {
    this.clearCanvas();
    this.player.items.draw();
    this.player.update();
    this.store.draw();
    this.shipContainer.draw();
    requestAnimationFrame(this.update);
  }


}

module.exports = Game;


/***/ }),
/* 5 */
/***/ (function(module, exports) {


class Store {
  constructor(ctx){
    this.ctx = ctx;
  }

  draw(){
    this.ctx.fillStyle = "pink";
    this.ctx.fillRect(550, 150, 50, 50);
  }
}

module.exports = Store;


/***/ }),
/* 6 */
/***/ (function(module, exports) {

class ShipContainer {
  constructor(ctx){
    this.ctx = ctx;
    this.x = 550;
    this.y = 100;
    this.size = 50;

    this.backpack = undefined;
    this.total = 0;

    this.display = this.display.bind(this);
    this.quantityOpts = this.quantityOpts.bind(this);
    this.getPrice = this.getPrice.bind(this);
  }

  draw(){
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(this.x, this.y, this.size, this.size);
  }

  quantityOpts(item){
    let $select = $('<select>').addClass(`select-${item.className} select-ship-container`);
    for(let i = 0; i <= item.count; i++){
      let $opt = $(`<option data-price=\"${item.price}\" value=\"${i}\">`).html(i);
      $select.append($opt);
    }
    return $select;
  }

  display(){
    let $table = $('.ship-container-content-table');
    $table.empty();
    let $tr1 = $('<tr>');
    let $th1 = $('<th>').html("Name");
    let $th2 = $('<th>').html("Price");
    let $th3 = $('<th>').html("Quantity");
    $table.append($tr1.append($th1).append($th2).append($th3));
    Object.keys(this.backpack).forEach(key => {
      let $tr2 = $('<tr>');
      let $td1 = $('<td>').html(key);
      let $td2 = $('<td>').html(`${this.backpack[key].price}`);
      let $td3 = $('<td>');
      let $input = this.quantityOpts(this.backpack[key]);
      $table.append($tr2.append($td1).append($td2).append($td3.append($input)));
    });
  }

  getPrice(){
    let basePrice = 0;

    $(".select-ship-container").change(function(){
      let newPrice = basePrice;
      let selectedOpts = $('.select-ship-container option:selected');
      $.each(selectedOpts, (index) => {
        debugger
        newPrice += parseInt($(selectedOpts[index])[0].value) *
        parseInt(selectedOpts[index].context.options[0].attributes[0].value);
      });
      $('.ship-container-content-total').html(`Total: ${newPrice}`);
    });
  }

  show(backpack){
    this.backpack = backpack;
    this.display();
    this.getPrice();
    document.getElementById('ship-container-modal').style.display = "block";
  }

  hide(){
    document.getElementById('ship-container-modal').style.display = "none";
  }

  sell(){

  }

}

module.exports = ShipContainer;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map