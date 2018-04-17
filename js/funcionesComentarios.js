var servicioActual = "";
var temaActual = "";
var servicio;

window.onload = function() 
{
	var requestURL = "https://uns-iaw-2018-com08.github.io/Service-Maps/data/servicios.json";
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
	      recuperarComentarios();
	      agregarNombreServicio();
	    }
	  } 
	}
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

function agregarNombreServicio()
{
	document.getElementById("nombreServicio").innerHTML += "<b>"+ servicio.nombre +"</b>";
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

function guardarComentarios()
{
	var comentarios = document.getElementById("listaComentarios").innerHTML;
	localStorage.setItem(servicio.nombre, comentarios);
}

function recuperarComentarios()
{
	var t = localStorage.getItem(servicio.nombre);
	if (t != null)
	{
		document.getElementById("listaComentarios").innerHTML = t;
	}
}

$(function() {
  $("#linkInicio").click(function() {
    window.location.href = "index.html";
  });
});

$(function() {
  $("#botonVolver").click(function() {
    window.location.href = "servicios.html?id=" + servicio.id;
  });
});

$(function() {
  $("#botonPostear").click(function() {
	  var nombre = document.getElementById("cajaNombre").value;
		if (nombre != null && nombre != "")
		{
			var apellido = document.getElementById("cajaApellido").value;
			if (apellido != null && apellido != "")
			{
				var comentario = document.getElementById("cajaComentarios").value;
				if (comentario != null && comentario != "")
				{
					var comentario = document.getElementById("cajaComentarios").value;
					document.getElementById("listaComentarios").innerHTML += "Nombre: <b>"+nombre+" "+apellido+"</b><br>Comentario: "+comentario +"<br>";
					guardarComentarios();
				}
				else
				{
						alert("No se cargó ningún comentario");
				}
			}
			else
			{
					alert("No se cargó ningún apellido");
			}
		}
		else
		{
				alert("No se cargó ningun nombre");
		}
  });
});