const Items = require('./items.js');

const SIZE = 10;

class Player {
  constructor(canvas, ctx, shipContainer){
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
    this.backpack = {};
    this.wallet = 0;
    this.items = new Items(this.canvas, this.ctx);
    this.collision = false;
    this.shipContainer = shipContainer;
    this.enterShipContainer = false;

    this.move = this.move.bind(this);
    this.draw = this.draw.bind(this);
    this.update = this.update.bind(this);
    this.keyUp = this.keyUp.bind(this);
    this.keyDown = this.keyDown.bind(this);
    this.checkCollision = this.checkCollision.bind(this);
    this.pickUp = this.pickUp.bind(this);
    this.displayBackpack = this.displayBackpack.bind(this);
    this.removeItemFromField = this.removeItemFromField.bind(this);
    this.checkShipContainerCollision = this.checkShipContainerCollision.bind(this);


    this.keyUp();
    this.keyDown();
    this.checkCollision();
    this.checkShipContainerCollision();
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
      if(e.keyCode === 66) this.displayBackpack();
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

  checkShipContainerCollision(){
    this.shipContainer.hide();
    if (this.x < this.shipContainer.x + this.shipContainer.size &&
      this.x + this.size > this.shipContainer.x &&
      this.y < this.shipContainer.y + this.shipContainer.size &&
      this.size + this.y > this.shipContainer.y){
        this.shipContainer.show(this.backpack);
        cancelAnimationFrame(this.checkShipContainerCollision);
        this.x = 100;
        this.y = 100;
    } else {
      this.shipContainer.hide();
      requestAnimationFrame(this.checkShipContainerCollision);
    }
  }

  removeItemFromField(){
    for(let i = 0; i < this.items.items.length; i++){
      if (this.items.items[i].id === this.pickUpItem.id){
        this.items.items.splice(i, 1);
        if($('.backpack').hasClass("backpack-show")){
          $('.backpack').removeClass("backpack-show");
          this.displayBackpack();
        }
      }
    }
  }

  pickUp(){
    if(this.pickUpItem !== undefined){
      if(this.backpack[this.pickUpItem.name]){
        this.backpack[this.pickUpItem.name].count ++ ;
      } else {
        this.backpack[this.pickUpItem.name] = this.pickUpItem["count"] = 1;
        this.backpack[this.pickUpItem.name] = this.pickUpItem;
      }
      this.removeItemFromField();
    }
    this.pickUpItem = undefined;
    console.log(this.backpack);
  }

  displayBackpack(){
    let $backpack = $('.backpack');
    if($backpack.hasClass("backpack-show")){
      $backpack.removeClass("backpack-show");
    } else {
      $backpack.addClass("backpack-show");
    }

    let $backpackUl = $('.backpack-ul');
    $backpackUl.empty();
    Object.keys(this.backpack).forEach(item => {
      let $itemImg = $('<div>').css({
        "height": "25px",
        "width": "25px",
        "background-image": `url(${this.backpack[item].imageSrc})`,
        "background-position": `${418-this.backpack[item].srcPos[0]}px ${750-this.backpack[item].srcPos[1]}px`
      });
      let $itemQty = $('<div>').addClass("backpack-item-price").html(`${this.backpack[item].count}`);
      $backpackUl.append($('<li>').append($itemImg).append($itemQty));
    });
  }

  update() {
    this.draw();
    this.move();
  }

}

module.exports = Player;
