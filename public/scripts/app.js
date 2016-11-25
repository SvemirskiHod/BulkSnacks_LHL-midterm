
$(document).ready(function() {

  $("#basket-link").on("click", function(event){
    event.preventDefault();
    if(localStorage.getItem('cart') === null){
      localStorage.setItem('cart', "{}");
    }
    window.location.href = "/basket?" + $.param(JSON.parse(localStorage.getItem('cart')));
  });

})

/*$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;
});
*/