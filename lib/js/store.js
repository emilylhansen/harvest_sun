
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
