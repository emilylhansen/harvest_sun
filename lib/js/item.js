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
