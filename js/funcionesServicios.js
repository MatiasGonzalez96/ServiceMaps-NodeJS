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
      if(obj === undefined)
      {
        mostrarMensajeError(id);        
      }
      else 
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
  document.getElementById("nombreServicio").innerHTML += "<b>"+ servicio.nombre + "</b>";
  document.getElementById("tipoServicio").innerHTML += " <b>"+ servicio.tipo + "</b>";
  document.getElementById("direccionServicio").innerHTML += " <b>"+ servicio.direccion + "</b>";
  document.getElementById("telefonoServicio").innerHTML += " <b>"+ servicio.telefono + "</b>";
  document.getElementById("horarioServicio").innerHTML += " <b>"+ servicio.horario + "</b>";
  document.getElementById("webServicio").innerHTML += " <a class='info-link' href='http://" + servicio.sitioweb + "/' target='_blank' rel='noopener'>" + servicio.sitioweb + "</a>";

  //Cargo la imagen del servicio
  $("#imagenServicio").attr("src", "media/imgs/" + servicio.imagen);
}

function mostrarMensajeError(id)
{
  ocultarPaneles();

  var midiv = document.getElementById("panelMapaServicios");
  midiv.setAttribute("id","panelError");

  $("#panelError").html("<span id='etiquetaError'><b> No se encontró la búsqueda </b> \"<b>" + id + "</b>\"</span>");
  
  var stringAviso = "Ingrese correctamente el nombre del servicio (respetando mayúsculas y minúsculas)";
  $("#panelError").append("<span id='etiquetaAviso'>"+ stringAviso + "</span>");
}

function ocultarPaneles()
{
  $("#panelServicios").hide();
}

$(function() {
  $("#botonComentar").click(function() {
    window.location.href = "comentar.html?id=" + servicio.id;
  });
});

$(function() {
  $("#linkInicio").click(function() {
    window.location.href = "index.html";
  });
});