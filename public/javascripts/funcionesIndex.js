var servicios;
var marcadores = [];
var map;

$(function() {
  $.get("./API/servicios", function (servs) 
  {
      servicios = servs;
      cargarBusqueda();
      $("body").append("<script src='https://maps.googleapis.com/maps/api/js?key=AIzaSyAEttQKWZVwwmLu9Rn9IV37PTCxFIdMNKs&callback=initMap' async defer></script>");
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