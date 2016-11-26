$(document).ready(function() {

  $(".add-quantity").on("click", function(event){
    debugger;
    let input = $(this).siblings().find("input");
    let currentVal = input.val();
    currentVal = Number(currentVal) +1;
    input.val(currentVal);

    let id = Number((input.attr("id")));
    basket = JSON.parse(localStorage.getItem('basket'));
    basket[id] = currentVal;
    localStorage.setItem('basket', JSON.stringify(basket));

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
    basket = JSON.parse(localStorage.getItem('basket'));
    basket[id] = currentVal;
    localStorage.setItem('basket', JSON.stringify(basket));

  });

});