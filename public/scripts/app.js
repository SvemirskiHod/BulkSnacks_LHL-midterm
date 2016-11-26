
$(document).ready(function() {

  $("#basket-link").on("click", function(event){
    event.preventDefault();
    if(localStorage.getItem('basket') === null){
      localStorage.setItem('basket', "{}");
    }
    window.location.href = "/basket?" + $.param(JSON.parse(localStorage.getItem('basket')));
  });

});

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