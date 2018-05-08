var posActual;

function initMap()
{
  var ubicacionServicio = new google.maps.LatLng(parseFloat(document.getElementById('map').getAttribute("latitud")), parseFloat(document.getElementById('map').getAttribute("longitud")));
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
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

  if (navigator.geolocation)
  {
        navigator.geolocation.getCurrentPosition(function(position)
        {
              posActual =
              {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };

              mostrarDistanciaServicio();

              markerA = new google.maps.Marker({
                  position: posActual,
                  title: "Mi Ubicación",
                  map: map
              });

              directionsService = new google.maps.DirectionsService,
              directionsDisplay = new google.maps.DirectionsRenderer({
                map: map
              }),

              // get route from A to B
              calculateAndDisplayRoute(directionsService, directionsDisplay, posActual, ubicacionServicio);
       });
  }

  var markerB = new google.maps.Marker({
    position: ubicacionServicio,
    map: map,
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

function mostrarDistanciaServicio()
{
  var latitud = parseFloat(document.getElementById('map').getAttribute("latitud"));
  var longitud = parseFloat(document.getElementById('map').getAttribute("longitud"));
  var destino = new google.maps.LatLng(latitud, longitud);
  var distancia = Math.round(getDistance(destino));
  document.getElementById("distanciaServicio").innerHTML = "¡Usted se encuentra a " + distancia + " metros del servicio!";
}

function getDistance(destino)
 {
     var origen = new google.maps.LatLng(posActual.lat, posActual.lng);
     var distance = google.maps.geometry.spherical.computeDistanceBetween(origen, destino);
     return distance;
 }

 function calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB)
 {
  directionsService.route({
    origin: pointA,
    destination: pointB,
    travelMode: google.maps.TravelMode.DRIVING
  }, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}
