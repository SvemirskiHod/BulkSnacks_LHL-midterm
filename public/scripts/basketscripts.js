// send AJAX request with basket from localStorage
var basketSubmit = function() {
  $('#checkout-form').submit(function(event) {
      var $basket = [];
      event.preventDefault();
      $basket.push(localStorage.getItem('basket'));
      $.ajax({
        url: '/api/orders/new',
        method: 'POST',
        data: {"basket":$basket},
        success: function(data, textStatus) {
          localStorage.clear();
          window.location.assign('api/orders/done');
        }
      });
  });
}
// toggles visibility of order button based on login status
var checkoutButtonToggle = function() {
  var $checkoutBtn = $('button.checkout-button')
  var $emptyCartBtn = $('button.empty-cart')
  // if nothing in basket, don't display total or offer checkout
  if (localStorage.getItem('basket') === "{}") {
    $('.container.cart h2').html(`
      <h2><a href="/snacks">start scooping</a></h2>
      `);
    $checkoutBtn.hide();
    $emptyCartBtn.hide();
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
    var n;
    if ($(this).hasClass("reduce-quantity")){
      n = -1;
    }
    else {
      n = 1;
    }
    updateQuantity(input, currentVal, $min, n);

    var quantity = Number(input.val());
    var price = Number($(this).siblings().find('.price').text())
    var productTotal = quantity*price;
    $(this).siblings().find('.product-total').text(productTotal.toFixed(2));
    updateTotal();
  });

  $(".remove-item").on("click", function(event){
    var id = Number(($(this).siblings("input").attr("id")));
    basket = JSON.parse(localStorage.getItem('basket'));
    delete basket[id];
    localStorage.setItem('basket', JSON.stringify(basket));
    $("#main-basket").click();
    updateTotal();
  });

  $(".empty-cart").on("click", function(event){
      if(confirm("Are you sure you want to empty your basket?") === true){
        localStorage.clear();
        $("#main-basket").click();
      }
  });

});
