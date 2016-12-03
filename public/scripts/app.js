$(document).ready(function() {

  $("#basket-link").on("click", function(event){
    event.preventDefault();
    if(localStorage.getItem('basket') === null){
      localStorage.setItem('basket', "{}");
    }
    window.location.href = "/basket?" + $.param(JSON.parse(localStorage.getItem('basket')));
  });
  // add small visual effect when items added to basket
  $('button.add_item_button').click(function() {
    var $basket = $('#main-basket');
    $basket.css('-webkit-filter', 'brightness(2)');
    $basket.css('border', '3px solid black');
    $basket.css('border-radius', '20px');
    setTimeout(function() {
      $basket.css('-webkit-filter', 'brightness(1)')
      $basket.css('border', 'none');
    }, 600);
  });
  $('p.order-total-price').text(function() {
    var itemTotal = 0;
    $('tr.itemdata').each(function(row) {
      itemTotal += Number($(this).data('lineprice'))
    })
    return 'total: $' + itemTotal.toFixed(2);
  });

  $('form#sms-notify').submit(function(event) {
    event.preventDefault();
    var minutes = Number($('#sms-notify input').val());
    var phone   = Number($('#phonenumber').data('phone'));
    var $button = $('button#sms-submit');
    $button.prop('disabled', true);
    $button.text('notified!');
    $('#sms-notify input').hide();
    $.ajax({
        url: '/api/orders/notify',
        method: 'POST',
        data: { "data":[{
          "minutes": minutes,
          "phone": phone
        }]},
        success: function(data, textStatus) {
          console.log('notification completed')
        }
      });
  })

});
