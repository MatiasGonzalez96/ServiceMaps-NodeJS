var ruta = "css/EstilosIndex1.css";
var idTema = 0;
var servicioActual = "";
var servicios;

function init()
{
  var requestURL = "https://UNS-IAW-2018-COM08.github.io/Service-Maps/data/servicios.json";
  var request = new XMLHttpRequest();
  request.open('GET', requestURL);
  request.responseType = 'json';
  request.send();
  request.onload = function()
  {
    servicios = request.response;
    $("body").append("<script src='https://maps.googleapis.com/maps/api/js?key=AIzaSyAEttQKWZVwwmLu9Rn9IV37PTCxFIdMNKs&callback=initMap' async defer></script>");
  }
}

function initMap()
{
	/*Ubicacion de Bahia Blanca */
	var bahia = {lat: -38.7167, lng: -62.2833};

	var map = new google.maps.Map(document.getElementById('map'), {
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
	    cargarMarcador(servicios[i], map);
	}
	
}

function cargarMarcador(servicios, map)
{
	var marker = new google.maps.Marker({
		position: new google.maps.LatLng(servicios.latitud, servicios.longitud),
		map: map,
		title: servicios.nombre,
		url: "servicios.html?id=" + servicios.id,
		animation: google.maps.Animation.DROP
	});

	marker.addListener('click', function()
	{    	
    	window.location.href = this.url;		
  });
}

function cambiarTemaClasico()
{
	$("#HojaDeEstilosIndex").attr("href","css/EstilosIndex1.css");
	ruta = "css/EstilosIndex1.css";
	idTema = 0;
	guardarTemaPaginaPrincipal();
}

function cambiarTemaTurbo()
{
	$("#HojaDeEstilosIndex").attr("href","css/EstilosIndex2.css");
	ruta = "css/EstilosIndex2.css";
	idTema = 1;
	guardarTemaPaginaPrincipal();
}

function guardarTemaPaginaPrincipal()
{
	localStorage.setItem("temaIndex",ruta);
}

function recuperarTemaPaginaPrincipal()
{
	var t = localStorage.getItem("temaIndex");
	if (t != null)
	{
		$("#HojaDeEstilosIndex").attr("href", t);
	}
}

//No va aca
function oyenteBotonComentar()
{
	var url= "location.href='comentarios.html";
	setTimeout(url+"?nombre="+servicioActual+"&tema="+idTema+"'", 0);
}