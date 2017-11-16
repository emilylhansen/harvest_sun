const Items = require('./items.js');

const SIZE = 10;

class Player {
  constructor(canvas, ctx){
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
    this.basket = [];
    this.items = new Items(this.canvas, this.ctx);
    this.collision = false;

    this.move = this.move.bind(this);
    this.draw = this.draw.bind(this);
    this.update = this.update.bind(this);
    this.keyUp = this.keyUp.bind(this);
    this.keyDown = this.keyDown.bind(this);
    this.checkCollision = this.checkCollision.bind(this);
    this.pickUp = this.pickUp.bind(this);
    this.displayBasket = this.displayBasket.bind(this);


    this.keyUp();
    this.keyDown();
    this.checkCollision();
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

  pickUp(){
    console.log("pickUpItem", this.pickUpItem);
    if(this.pickUpItem !== undefined){
      this.basket.push(this.pickUpItem);
      for(let i = 0; i < this.items.items.length; i++){
        if (this.items.items[i].id === this.pickUpItem.id){
          this.items.items.splice(i, 1);
          this.displayBasket();
        }
      }
    }
    this.pickUpItem = undefined;
    console.log("this.items", this.items.items);
    console.log("this.basket", this.basket);
  }

  displayBasket(){
    let $basketUl = $('.basket-ul');
    $basketUl.empty();
    this.basket.forEach(item => {
      $basketUl.append(
        $('<li>').html(`${item.name}, ${item.price}`));
    });
  }

  update() {
    this.draw();
    this.move();
  }

}

module.exports = Player;
