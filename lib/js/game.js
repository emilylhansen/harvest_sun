const Items = require('./items.js');
const Player = require('./player.js');

class Game {
  constructor(canvas, ctx){
    this.canvas = canvas;
    this.ctx = ctx;
    this.player = new Player(this.canvas, this.ctx, this.items);

    this.update = this.update.bind(this);
    this.clearCanvas = this.clearCanvas.bind(this);
    this.drawStore = this.drawStore.bind(this);

  }

  drawStore(){
    this.ctx.fillStyle = "pink";
    this.ctx.fillRect(550, 150, 50, 50);
  }

  clearCanvas() {
    this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
  }

  update() {
    this.clearCanvas();
    this.player.items.draw();
    this.player.update();
    this.drawStore();
    requestAnimationFrame(this.update);
  }


}

module.exports = Game;
