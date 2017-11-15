
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
