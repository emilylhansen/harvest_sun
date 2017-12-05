const Item = require('./item');

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
