
$(document).ready(function() {

   console.log("hello world");

  $(".add-quantity").on("click", function(event){
    let input = $(this).siblings().find("input");
    let currentVal = input.val();
    currentVal = Number(currentVal) +1;
    input.val(currentVal);

    let id = Number((input.attr("id")));
    cart = JSON.parse(localStorage.getItem('cart'));
    cart[id] = currentVal;
    localStorage.setItem('cart', JSON.stringify(cart));


  });

  $(".reduce-quantity").on("click", function(event){

    let input = $(this).siblings().find("input");
    let currentVal = input.val();
    let $min = input.attr("min")
    if(currentVal != $min){
      currentVal = Number(currentVal) -1;
      input.val(currentVal);
    }
    let id = Number((input.attr("id")));
    cart = JSON.parse(localStorage.getItem('cart'));
    cart[id] = currentVal;
    localStorage.setItem('cart', JSON.stringify(cart));

  });

});