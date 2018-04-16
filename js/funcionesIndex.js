var servicios;
var marcadores = [];
var map;

$(function() 
{
  var requestURL = "https://uns-iaw-2018-com08.github.io/Service-Maps/data/servicios.json";
  var request = new XMLHttpRequest();
  request.open('GET', requestURL);
  request.responseType = 'json';
  request.send();
  request.onload = function()
  {
    servicios = request.response;
    var nombresServicios = obtenerNombresServicios(servicios);
    $("body").append("<script src='https://maps.googleapis.com/maps/api/js?key=AIzaSyAEttQKWZVwwmLu9Rn9IV37PTCxFIdMNKs&callback=initMap' async defer></script>");
    cargarTema();
  }
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
		url: "servicios.html?id=" + servicios.id,
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

$(function() {
  $("#linkInicio").click(function() {
    window.location.href = "index.html";
  });
});

$(function() {
  $("#linkTemaClasico").click(function() {    
   	$("#temaActual").attr("href","css/clasico.css");
	localStorage.setItem("tema",0);
  });
});

$(function() {
  $("#linkTemaTurbo").click(function() {    
	$("#temaActual").attr("href","css/turbo.css");
	localStorage.setItem("tema",1);
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


function obtenerNombresServicios(servicios) 
{
  var nombres = [];
  for (var i = 0; i < servicios.length; i++) 
  {
    nombres.push(servicios[i].nombre);
  }
  return nombres;
}

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