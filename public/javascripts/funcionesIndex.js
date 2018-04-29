var servicios;
var marcadores = [];
var map;

$(function() {
  $.get("./api/servicios", function (servs) 
  {
      servicios = servs;
      var nombresServicios = obtenerNombresServicios();
      $("#inputBusqueda").autocomplete({
        source: nombresServicios,
        select: function(event, ui) 
        {
          $("#inputBusqueda").val(ui.item.value);
          buscarInput(ui.item.value);
        }
      });
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
		url: "/servicios?id=" + servicios.id,
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

function obtenerNombresServicios() 
{
  var nombres = [];
  for (var i = 0; i < servicios.length; i++) 
  {
    nombres.push(servicios[i].nombre);
  }
  return nombres;
}

$(function() {
  $("#inputBusqueda").keyup(function(event) {
    if (event.keyCode === 13) {
      if (inputValue.localeCompare("") != 0) {
        buscarInput(inputValue);
      }
    }
    return false;
  });
});

$(function() {
  $("#botonBusqueda").click(function() {
    var inputValue = $("#inputBusqueda").val();
    if (inputValue.localeCompare("") != 0) {
      buscarInput(inputValue);
    }
    else
    {
      alert("Ingrese un servicio para buscar")
    }
    return false;
  });
});

function buscarInput(value) 
{
  var id = obtenerIdServicio(value);
  if (id !== undefined) {
    window.location.href = "/servicios?id=" + id;
  } 
  else 
  {
    window.location.href = "/servicios?id=" + value.toLowerCase().replace(/\s+/g, '_');
  }
}

function obtenerIdServicio(name) 
{
  var id;
  var obj = $.grep(servicios, function(obj){return obj.nombre === name;})[0]; // Buscar elemento usando jQuery
  if (obj !== undefined) 
  {
    id = obj.id;
  }
  return id;
}

// Overrides the default autocomplete filter function to search only from the beginning of the string
$.ui.autocomplete.filter = function (array, term) {
    var matcher = new RegExp("^" + $.ui.autocomplete.escapeRegex(term), "i");
    return $.grep(array, function (value) {
        return matcher.test(value.label || value.value || value);
    });
};

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