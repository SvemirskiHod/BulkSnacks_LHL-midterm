
$(document).ready(function() {

  $("#basket-link").on("click", function(event){
    event.preventDefault();
    if(localStorage.getItem('basket') === null){
      localStorage.setItem('basket', "{}");
    }
    window.location.href = "/basket?" + $.param(JSON.parse(localStorage.getItem('basket')));
  });

});
