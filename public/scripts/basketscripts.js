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
    $('.container h2').html(`
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
var updateTotal = function(){
var total = 0;
  var arrayOfTotals = $(".product-total");
  for (var i=0; i<arrayOfTotals.length; i++){
    total += Number(arrayOfTotals[i].innerHTML);
  }
  $("#total").text(total.toFixed(2));
}

var updateQuantity = function(input, currentVal, $min, n) {
  if(currentVal != $min){
    input.val(Number(currentVal) + n);
  }
  var id = Number((input.attr("id")));
  basket = JSON.parse(localStorage.getItem('basket'));
  basket[id] = currentVal;
  localStorage.setItem('basket', JSON.stringify(basket));
}

var buttonWatcher = function(){
 $(".reduce-quantity, .add-quantity").on("click", function(event){
  var input = $(this).siblings("input");
  var currentVal = input.val();
  var $min = input.attr("min")
  if ($(this).attr('class') === "reduce-quantity"){
    var n = -1;
  }
  else {
    var n = 1;

  }
  updateQuantity(input, currentVal, $min, n);

  var quantity = Number(input.val());
  var price = Number($(this).parent().siblings().find('.price').text())
  var productTotal = quantity*price;
  $(this).parent().siblings().find('.product-total').text(productTotal.toFixed(2));

  updateTotal();
  });

}
