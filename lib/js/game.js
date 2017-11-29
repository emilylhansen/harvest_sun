const Items = require('./items.js');
const Player = require('./player.js');
const Store = require('./store.js');
const ShipContainer = require('./shipContainer.js');

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
