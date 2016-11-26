var basketSubmit = function() {
  $('#checkout-form').submit(function(event) {
      event.preventDefault();
      var $basket = localStorage.getItem('basket')

      $.ajax({
        url: '/api/orders/new',
        method: 'PUT',
        basket: $basket
      }).done(function() {
        console.log($(this))
      })
  });
}

var checkoutButtonToggle = function() {
  var $checkoutBtn = $('button.checkout-button')
  // if nothing in basket, don't display total or offer checkout
  if (localStorage.getItem('basket') === "{}") {
    $('.container h1').html(`
      <h2><a href="/snacks">start scooping</a></h2>
      `);
    $checkoutBtn.hide();
  }
}

$(document).ready(function() {

  checkoutButtonToggle();
  basketSubmit();

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