
$(document).ready(function() {
    console.log( "ready!" );

  $(".new-tweet textarea").on('input', function(ev){
    var x = 140 - $(ev.target).val().length;
    $(".new-tweet .counter").text(x);
    if(x<0){
      $(".new-tweet .counter").css('color', 'red');
    }else{
      $(".new-tweet .counter").css('color', 'black');
    }
  });

  $(".tweet .user-tweets").hover(function(ev) {
    $(ev.target).css("background-color","red")
  });

});


