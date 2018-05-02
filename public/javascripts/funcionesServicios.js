function initMap() 
{
  var ubicacionServicio = new google.maps.LatLng(parseFloat(document.getElementById('map').getAttribute("latitud")), parseFloat(document.getElementById('map').getAttribute("longitud")));
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 16,
    center: ubicacionServicio,
    styles: [
      {
        featureType: "poi",
        elementType: "labels",
        stylers: [
          { visibility: "off" }
        ]
      }
    ]
  });
  var marker = new google.maps.Marker({
    position: ubicacionServicio,
    map: map,
    animation: google.maps.Animation.DROP
  });
}

$(function() {
  $("#botonComentar").click(function() {
    window.location.href = "../comentarios/" + id + "/";
  });
});

$(function() {
  $("#linkInicio").click(function() {
    window.location.href = "/";
  });
});