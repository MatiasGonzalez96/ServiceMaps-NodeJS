var servicio;

$(function() 
{
  	$.get("./api/servicios", function (servs) 
  	{
	    var data = servs;
	    var id = obtenerParametroURL("id");
	    if (id === false) 
	    { 
	      	// Si se quiso acceder sin ningun id
	      	window.location.replace("/");
	    } 
	    else 
	    {
	        // Buscar elemento usando jQuery
			var obj = $.grep(data, function(obj){return obj.id === id;})[0]; 
			if (obj !== undefined) 
			{ 
			  servicio = obj;
			  cargarNombreServicio();
			  recuperarComentarios();
			}
	    }
  	});
});

function obtenerParametroURL(variable) 
{
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) 
  {
    var pair = vars[i].split("=");
    if (pair[0] == variable) 
    {
      return pair[1];
    }
  }
  return(false);
}

function cargarNombreServicio()
{
	document.getElementById("nombreServicio").innerHTML += servicio.nombre +"!";
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
    window.location.href = "/";
  });
});

$(function() {
  $("#botonVolverComentario").click(function() {
    window.location.href = "/servicios?id=" + servicio.id;
  });
});

$(function() {
  $("#botonVerComentarios").click(function() {
  	var t = localStorage.getItem(servicio.nombre);
	if (t != null)
	{
		$("#panelComentarios").show();
	} 
	else
	{
		alert("No hay comentarios para mostrar");
	}   
  });
});

$(function() {
  $("#botonOcultarComentarios").click(function() {
    $("#panelComentarios").hide();
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

					//Creo el panel con el comentario
					var midiv = document.createElement("div");
					midiv.setAttribute("id", "panelFormatoComentario");
					midiv.innerHTML = "<h5> <b>"+ nombre +" "+ apellido +"</b> </hs> <hr> <h6>"+ comentario + "</h6>";
					document.getElementById("listaComentarios").appendChild(midiv);

					guardarComentarios();

					$("#cajaNombre").attr("placeholder", "Nombre*");
					document.getElementById("cajaNombre").value = "";

					$("#cajaApellido").attr("placeholder", "Apellido*");
					document.getElementById("cajaApellido").value = "";

					$("#cajaComentarios").attr("placeholder", "Inserte comentario*");
					document.getElementById("cajaComentarios").value = "";

					alert("Comentario cargado con éxito");

					$("#panelComentarios").show();

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