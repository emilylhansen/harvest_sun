class ShipContainer {
  constructor(ctx){
    this.ctx = ctx;
    this.x = 550;
    this.y = 100;
    this.size = 50;

    this.backpack = undefined;
    this.total = 0;

    this.display = this.display.bind(this);
    this.quantityOpts = this.quantityOpts.bind(this);
    this.getPrice = this.getPrice.bind(this);
  }

  draw(){
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(this.x, this.y, this.size, this.size);
  }

  quantityOpts(item){
    let $select = $('<select>').addClass(`select-${item.className} select-ship-container`);
    for(let i = 0; i <= item.count; i++){
      let $opt = $(`<option data-price=\"${item.price}\" value=\"${i}\">`).html(i);
      $select.append($opt);
    }
    return $select;
  }

  display(){
    let $table = $('.ship-container-content-table');
    $table.empty();
    let $tr1 = $('<tr>');
    let $th1 = $('<th>').html("Name");
    let $th2 = $('<th>').html("Price");
    let $th3 = $('<th>').html("Quantity");
    $table.append($tr1.append($th1).append($th2).append($th3));
    Object.keys(this.backpack).forEach(key => {
      let $tr2 = $('<tr>');
      let $td1 = $('<td>').html(key);
      let $td2 = $('<td>').html(`${this.backpack[key].price}`);
      let $td3 = $('<td>');
      let $input = this.quantityOpts(this.backpack[key]);
      $table.append($tr2.append($td1).append($td2).append($td3.append($input)));
    });
  }

  getPrice(){
    let basePrice = 0;

    $(".select-ship-container").change(function(){
      let newPrice = basePrice;
      let selectedOpts = $('.select-ship-container option:selected');
      $.each(selectedOpts, (index) => {
        debugger
        newPrice += parseInt($(selectedOpts[index])[0].value) *
        parseInt(selectedOpts[index].context.options[0].attributes[0].value);
      });
      $('.ship-container-content-total').html(`Total: ${newPrice}`);
    });
  }

  show(backpack){
    this.backpack = backpack;
    this.display();
    this.getPrice();
    document.getElementById('ship-container-modal').style.display = "block";
  }

  hide(){
    document.getElementById('ship-container-modal').style.display = "none";
  }

  sell(){

  }

}

module.exports = ShipContainer;