const Items = require('./items.js');
const Player = require('./player.js');

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
