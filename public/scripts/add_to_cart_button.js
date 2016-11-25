$(document).ready(function() {
  console.log( "ready!" );

  let cart = JSON.parse(localStorage.getItem('cart') || "{}");

  $(".add_item_button").click(function(event){
    let id = $(this).data("productid");
    if(cart[id]){
      cart[id] += 1;
    }
    else {
      cart[id] = 1;
    }
    console.log(cart);
    localStorage.setItem('cart', JSON.stringify(cart));

 });

});

