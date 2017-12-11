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
    this.sell = this.sell.bind(this);
    this.close = this.close.bind(this);

    this.close();
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

    $(".select-ship-container").change(() => {
      let newPrice = basePrice;
      let selectedOpts = $('.select-ship-container option:selected');
      $.each(selectedOpts, (index) => {
        newPrice += parseInt($(selectedOpts[index])[0].value) *
        parseInt($(selectedOpts[index]).context.attributes[0].value);
      });
      $('.ship-container-content-total').html(`Total: ${newPrice}`);
      this.total = newPrice;
    });

  }

  show(backpack){
    this.backpack = backpack;
    this.display();
    this.getPrice();
    this.sell();
    document.getElementById('ship-container-modal').style.display = "block";
  }

  hide(){
    document.getElementById('ship-container-modal').style.display = "none";
  }

  sell(){
    let backpack = this.backpack;
    $("#sell-btn").click(function(){
      let selectedOpts = $('.select-ship-container option:selected');
      $.each(selectedOpts, function(index) {
        if(backpack[Object.keys(backpack)[index]] !== undefined){
          backpack[Object.keys(backpack)[index]].count -= parseInt($(selectedOpts[index])[0].value);
        }
      });
      Object.keys(backpack).forEach(key => {
        if(backpack[key].count === 0){
          delete backpack[key];
        }
      });

    });
    this.backpack = backpack;
  }

  close(){
    $(".fa-times-circle").click(() => {
      this.hide();
    });
  }

}

module.exports = ShipContainer;
