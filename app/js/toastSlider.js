$(document).ready(function () {
  let toastLink = new ToastLink();

  $("#burn-slider").slider();

  $("#burn-slider").slider({
    slide: function( event, ui ) {
      let burnAmount = $("#burn-slider").slider('value');
      $("section.breadholder img.toasted").css("opacity", burnAmount/100);
    }
  });

  $("a.toastit").click(function () {
    toastLink.pushToast({
      "intensity": $("#burn-slider").slider('value'),
      "timestamp": new Date().getTime()
    });
  });

});
