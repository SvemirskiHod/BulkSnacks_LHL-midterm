// send AJAX request with basket from localStorage
var basketSubmit = function() {
  $('#checkout-form').submit(function(event) {
      event.preventDefault();
      var $basket = localStorage.getItem('basket')
      console.log($basket)
      $.ajax({
        url: '/api/orders/new',
        method: 'PUT',
        basket: $basket
      }).done(function() {
      })
  });
}

// toggles visibility of order button based on login status
var checkoutButtonToggle = function() {
  var $checkoutBtn = $('button.checkout-button')
  // if nothing in basket, don't display total or offer checkout
  if (localStorage.getItem('basket') === "{}") {
    $('.container.cart h2').html(`
      <h2><a href="/snacks">start scooping</a></h2>
      `);
    $checkoutBtn.hide();
  }
}


var updateTotal = function(){
  var total = 0;
  var arrayOfTotals = $(".product-total");
  for (var i=0; i<arrayOfTotals.length; i++){
    total += Number(arrayOfTotals[i].innerHTML);
  }
  $("#total").text(total.toFixed(2));
}

var updateQuantity = function(input, currentVal, $min, n) {
  var itemCount = Number(currentVal)

  if (((input.val() > 0) && n === 1) || ((input.val() > 1) && n === -1)) {
    itemCount += n;
    input.val(itemCount);
  }

  currentVal = itemCount;
  var id = Number((input.attr("id")));
  basket = JSON.parse(localStorage.getItem('basket'));
  basket[id] = currentVal;
  localStorage.setItem('basket', JSON.stringify(basket));
}


$(document).ready(function() {

  updateTotal();
  checkoutButtonToggle();
  basketSubmit();

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

});
