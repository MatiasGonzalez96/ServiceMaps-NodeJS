var servicios;
var marcadores = [];
var ultimoInfoWindow;
var map;

function initMapIndex()
{
	var bahiaBlanca = new google.maps.LatLng(-38.7167, -62.2833);

	map = new google.maps.Map(document.getElementById('map'), {
	  	zoom: 13,
	  	center: bahiaBlanca,
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

    ultimoInfoWindow = new google.maps.InfoWindow({map: map});

    $.get("./api/servicios", function (servs)
    {
        servicios = servs;
        cargarBusqueda();

        // Agrego los marcadores para cada servicio
        for (i = 0; i < servicios.length; i++)
    	{
    	    cargarMarcador(servicios[i]);
    	}
    });
}

function cargarMarcador(servicio)
{
	var marker = new google.maps.Marker({
		position: new google.maps.LatLng(servicio.latitud, servicio.longitud),
		map: map,
		animation: google.maps.Animation.DROP
	});

	marker.addListener('click', function()
	{
        ultimoInfoWindow.close();
        ultimoInfoWindow.setContent(crearContenidoInfowindow(servicio));
        ultimoInfoWindow.open(map, this);
    });

    marcadores.push(marker);
}

function crearContenidoInfowindow(servicio)
{
    return  '<div id="panelInfoWindow">' +
                '<div id="panelImagenInfoWindow">' +
                    '<img id="imagenInfoWindow" src=/images/imgs/' + servicio.imagen + '>' +
                '</div>' +
                '<div id="panelInformacionInfoWindow">' +
                    '<p> <b>' + servicio.nombre + '</b> </p>' +
                    '<br' +
                    '<p>' + servicio.direccion + '</p>' +
                    '<a href="/servicios/' + servicio.id + '/">Mostrar información</a>' +
                '</div>' +
            '</div>';
}
