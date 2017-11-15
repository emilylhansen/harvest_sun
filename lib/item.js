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
