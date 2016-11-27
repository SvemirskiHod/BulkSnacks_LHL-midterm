
$(document).ready(function() {

  $("#basket-link").on("click", function(event){
    event.preventDefault();
    if(localStorage.getItem('basket') === null){
      localStorage.setItem('basket', "{}");
    }
    window.location.href = "/basket?" + $.param(JSON.parse(localStorage.getItem('basket')));
  });

  $('button.add_item_button').click(function() {
    $('#main-basket').css('-webkit-filter', 'brightness(2)');
    $('#main-basket').css('border', '3px solid black');
    setTimeout(function() {
      $('#main-basket').css('-webkit-filter', 'brightness(1)')
      $('#main-basket').css('border', 'none');
    }, 600);
  });

});
