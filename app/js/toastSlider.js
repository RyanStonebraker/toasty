$(document).ready(function () {
  $("#burn-slider").slider();

  $( "#burn-slider" ).slider({
    change: function( event, ui ) {
      let burnAmount = $("#burn-slider").slider('value');
      $("section.breadholder img.toasted").css("opacity", burnAmount/100);
    }
  });

});
