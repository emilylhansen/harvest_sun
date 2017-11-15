const Item = require('./item');

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
