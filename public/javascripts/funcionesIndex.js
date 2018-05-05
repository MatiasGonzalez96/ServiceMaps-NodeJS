var servicios;
var marcadores = [];
var map;
var posActual = {};

$(function() {
  $.get("./API/servicios", function (servs)
  {
      servicios = servs;
      cargarBusqueda();
      $("body").append("<script src='https://maps.googleapis.com/maps/api/js?key=AIzaSyAEttQKWZVwwmLu9Rn9IV37PTCxFIdMNKs&libraries=geometry&callback=initMap' async defer></script>");
  });
});

function initMap()
{
	/*Ubicacion de Bahia Blanca */
	var bahia = {lat: -38.7167, lng: -62.2833};

	map = new google.maps.Map(document.getElementById('map'), {
	  	zoom: 13,
	  	center: bahia,
    	styles:
    	[
	      	{
		        featureType: "poi",
		        elementType: "labels",
		        stylers:
		        [
		          {
		          	visibility: "off"
		          }
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
                alert(posActual.lat);
                alert(posActual.lng);
         });
    }

	// Agrego los marcadores para cada servicio
	for (i = 0; i < servicios.length; i++)
	{
	    cargarMarcador(servicios[i]);
	}
}

function cargarMarcador(servicios)
{
	var contenidoInfoWindow = "<b>" + servicios.nombre + "</b><br>" + servicios.direccion;
  	var infoWindow = new google.maps.InfoWindow({
    	size: new google.maps.Size(150, 50),
    	content: contenidoInfoWindow
  	});

	var marker = new google.maps.Marker({
		position: new google.maps.LatLng(servicios.latitud, servicios.longitud),
		map: map,
		url: "servicios/" + servicios.id + "/",
		animation: google.maps.Animation.DROP
	});

	marker.addListener("mouseover", function() {
    	infoWindow.open(map, this);
 	});

	marker.addListener("mouseout", function() {
  	infoWindow.close();
	});

	marker.addListener('click', function()
	{
    	window.location.href = this.url;
  });

  marcadores.push(marker);
}

$(function() {
  $("#linkInicio").click(function() {
    window.location.href = "/";
  });
});

$(function() {
  $("#filtrarTodos").click(function() {
    for(var i = 0; i < marcadores.length; i++)
    {
      marcadores[i].setMap(null);
    }
    for(var i = 0; i < servicios.length; i++)
    {
      cargarMarcador(servicios[i]);
    }
  });
});

$(function() {
  $("#filtrarEstaciones").click(function() {
    for(var i = 0; i < marcadores.length; i++)
    {
      marcadores[i].setMap(null);
    }
    for(var i = 0; i < servicios.length; i++)
    {
      if(servicios[i].tipo == "Estación de Servicio")
      {
        cargarMarcador(servicios[i]);
      }
    }
  });
});

$(function() {
  $("#filtrarGomerias").click(function() {
    for(var i = 0; i < marcadores.length; i++)
    {
      marcadores[i].setMap(null);
    }
    for(var i = 0; i < servicios.length; i++)
    {
      if(servicios[i].tipo == "Gomería")
      {
        cargarMarcador(servicios[i]);
      }
    }
  });
});

$(function() {
  $("#filtrarTalleres").click(function() {
    for(var i = 0; i < marcadores.length; i++)
    {
      marcadores[i].setMap(null);
    }
    for(var i = 0; i < servicios.length; i++)
    {
      if(servicios[i].tipo == "Taller Mecánico")
      {
        cargarMarcador(servicios[i]);
      }
    }
  });
});

$(function()
{
  var btnContainer = document.getElementById("panelBotoneraFiltro");
  var btns = btnContainer.getElementsByClassName("botonFiltrar");
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
      var current = document.getElementsByClassName("activo");
      current[0].className = current[0].className.replace(" activo", "");
      this.className += " activo";
    });
  }
});

$(function() {
  $("#redonda500").click(function()
  {
    for(var i = 0; i < marcadores.length; i++)
    {
      marcadores[i].setMap(null);
    }
    for(var i = 0; i < servicios.length; i++)
    {
        var destino = new google.maps.LatLng(servicios[i].latitud, servicios[i].longitud);
        if(getDistance(destino) <= 1000)
        {
            cargarMarcador(servicios[i]);
        }
    }
  });
});

function getDistance(destino)
 {
     origen = new google.maps.LatLng(posActual.lat, posActual.lng);
     var distance = google.maps.geometry.spherical.computeDistanceBetween(origen, destino);
     return distance;
 }
