var servicios;

$(function() 
{
  $.get("data/servicios.json", function(data, status) 
  {
    var id = obtenerParametroURL("id");
    if (id === false) 
    { 
      // Si se quiso acceder sin ningun id
      window.location.replace("index.html");
    } 
    else 
    {
      // Buscar elemento usando jQuery
      var obj = $.grep(data, function(obj){return obj.id === id;})[0]; 
      if (obj !== undefined) 
      { 
      	servicios = obj;
        //mostrarInformacionServicio();
        //Cargo la api del mapa
        $("body").append("<script src='https://maps.googleapis.com/maps/api/js?key=AIzaSyAEttQKWZVwwmLu9Rn9IV37PTCxFIdMNKs&callback=initMap' async defer></script>");
      }       
    }
  });
});

function initMap() {
  var ubicacionServicio = new google.maps.LatLng(servicios.latitud, servicios.longitud);
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
    map: map
  });
}

function obtenerParametroURL(variable) 
{
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return(false);
}

function mostrarInformacionServicio()
{
  var hoy = new Date().getDay();

  $("#info-bar-logo").attr("src", cerveceria.logo);
  $("#info-bar-logo").attr("alt", "Logo " + cerveceria.nombre);
  $("#info-bar-picture").attr("src", cerveceria.foto);
  $("#info-bar-picture").attr("alt", "Foto " + cerveceria.nombre);

}