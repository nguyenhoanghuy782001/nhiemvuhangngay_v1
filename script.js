var timeout = new Date().getTime() + 86399000;
$(function () {
  $("#main").hide();
  // $("#header").html(Config.header);
  $("button").html(Config.buttomn);
  $("#countdown")
    .countdown(timeout, { elapse: true })
    .on("update.countdown", function (event) {
      if (event.elapsed) {
        $(this).text(Config.countdown_done);
        $("#submitbtn").attr("disabled", false);
      } else {
        $(this).text(
          Config.remaining +
            (event.strftime("%D") != "00"
              ? event.strftime(" %D:%H:%M:%S")
              : event.strftime(" %H:%M:%S"))
        );
        $("#submitbtn").attr("disabled", true);
      }
    });
  $("#countdown").countdown(0);
  window.addEventListener("message", function (event) {
    if (event.data.type == "toggleshow") {
      toggleshow(event.data.enable);
      if (event.data.enable && event.data.timeout != null) {
        timeout = event.data.timeout;
        $("#countdown").countdown(event.data.timeout, { elapse: true });
      }
    }
    if (event.data.type == "settimeout") {
      $("#countdown").countdown(event.data.timeout);
    }
  });

  $("#freeform").submit(function (e) {
    e.preventDefault();
    $.post(
      "http://nhiemvuhangngay/collect",
      JSON.stringify({ t: new Date().getTime() })
    );
  });

  document.onkeyup = function (data) {
    if (data.which == 27) {
      $.post("http://nhiemvuhangngay/hidemenu", JSON.stringify({}));
    }
  };
});

function toggleshow(show) {
  if (!show) {
    $("#main")
      .delay(1)
      .animate({ height: 0 }, 1, "swing", function () {
        $("#main").hide();
      });
  } else {
    $("#main").show();
    $("#main").delay(1).animate({ height: 600 }, 500);
  }
}


// Thứ Ngày tháng
var now = new Date();
var dname = now.getDay();
function updateClock(){
  var week = ["Chủ Nhật","Thứ 2","Thứ 3","Thứ 4","Thứ 5","Thứ 6","Thứ 7"];
  var ids =["dayname"];
  var values=[week[dname]];
  for(var i=0; i<ids.length; i++)
    document.getElementById(ids[i]).firstChild.nodeValue=values[i];
  }
function initClock() {
  updateClock();
  window.setInterval("updateClock()",1);
}
setInterval(function() {
  document.getElementById('radio'+dname).checked = true;
})