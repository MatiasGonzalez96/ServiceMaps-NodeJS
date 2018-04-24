var servicio;

$(function() 
{
  var requestURL = "https://uns-iaw-2018-com08.github.io/ServiceMaps/data/servicios.json";
  var request = new XMLHttpRequest();
  request.open('GET', requestURL);
  request.responseType = 'json';
  request.send();
  request.onload = function()
  {
    var data = request.response;

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
        servicio = obj;
        cargarTema();
        mostrarInformacionServicio();
        //Cargo la api del mapa
        $("body").append("<script src='https://maps.googleapis.com/maps/api/js?key=AIzaSyAEttQKWZVwwmLu9Rn9IV37PTCxFIdMNKs&callback=initMap' async defer></script>");
      }       
    }
  }
});

function initMap() {
  var ubicacionServicio = new google.maps.LatLng(servicio.latitud, servicio.longitud);
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

function cargarTema()
{
  var id = localStorage.getItem("tema");
      if (id != undefined) 
      {
        if (id == 1) 
        {
          $("#temaActual").attr("href", "css/turbo.css");
        }
      }
}

function mostrarInformacionServicio()
{
  //Cargo la informacion del servicio
  document.getElementById("etiquetaNombreServicio").innerHTML += " <b>"+ servicio.nombre + "</b>";
  document.getElementById("etiquetaTipoServicio").innerHTML += " <b>"+ servicio.tipo + "</b>";
  document.getElementById("etiquetaDireccionServicio").innerHTML += " <b>"+ servicio.direccion + "</b>";
  document.getElementById("etiquetaTelefonoServicio").innerHTML += " <b>"+ servicio.telefono + "</b>";
  document.getElementById("etiquetaHorarioServicio").innerHTML += " <b>"+ servicio.horario + "</b>";
  document.getElementById("etiquetaWebServicio").innerHTML += " <a class='info-link' href='http://" + servicio.sitioweb + "/' target='_blank' rel='noopener'>" + servicio.sitioweb + "</a>";

  //Cargo la imagen del servicio
  $("#imagenServicio").attr("src", "media/imgs/" + servicio.imagen);
}

$(function() {
  $("#botonVolver").click(function() {
    window.location.href = "index.html";
  });
});

$(function() {
  $("#botonComentar").click(function() {
    window.location.href = "comentarios.html?id=" + servicio.id;
  });
});