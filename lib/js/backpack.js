
class Backpack {
  constructor(){
    this.items = [];
  }

  addItem(item){
    this.items.push(item);
  }

  removeItem(item, items){
    // for(let i = 0; i < items.items.length; i++){
    //   if (items.items[i].id === item.id){
    //     this.items = items.items.splice(i, 1);
    //     this.draw();
    //   }
    // }
  }

  draw(){
    let $backpackUl = $('.backpack-ul');
    $backpackUl.empty();
    this.items.forEach(item => {
      $backpackUl.append(
        $('<li>').html(`${item.name}, ${item.price}`));
    });
  }
}

module.exports = Backpack;
