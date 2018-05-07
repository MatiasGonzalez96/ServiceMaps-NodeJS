var usuario;

$(function()
{
	usuario = localStorage.getItem("fb");
	if (usuario != undefined)
	{
		document.getElementById("nombreUsuario").innerHTML += usuario;
	  	recuperarComentarios();
	}
    else
	{
	  	mostrarMensajeLogeo();;
	}
});

function guardarComentarios()
{
	var comentarios = document.getElementById("listaComentarios").innerHTML;
	localStorage.setItem(nombre, comentarios);
}

function recuperarComentarios()
{
	var t = localStorage.getItem(nombre);
	if (t != null)
	{
		document.getElementById("listaComentarios").innerHTML = t;
	}
}

function mostrarMensajeLogeo()
{
	ocultarPaneles();

	var midiv = document.getElementById("panelFormulario");
	midiv.setAttribute("id","panelError");

	$("#panelError").html("<span id='etiquetaError'><b>¡Debe iniciar sesión para dejar su comentario!</b></span>");

	var stringAviso = "Para ello, vuelva a la página de inicio";
	$("#panelError").append("<span id='etiquetaAviso'>"+ stringAviso + "</span>");

	$("#panelError").append("<span id='etiquetaAviso'><a id='linkInicioError' href='/'>Volver al inicio</a></span>");
}

function ocultarPaneles()
{
	$("#nombreServicio").hide();
	$("#panelUsuarioActual").hide();
	$("#cajaComentarios").hide();
	$("#panelBotoneraComentarios").hide();
}

$(function() {
  $("#linkInicio").click(function() {
    window.location.href = "/";
  });
});

$(function() {
  $("#botonVolverComentario").click(function() {
    window.location.href = "/servicios/" + id + "/";
  });
});

$(function()
{
  $("#botonPostear").click(function()
  {
	var comentario = document.getElementById("cajaComentarios").value;
	if (comentario != null && comentario != "")
	{
		var comentario = document.getElementById("cajaComentarios").value;

		//Creo el panel con el comentario
		var midiv = document.createElement("div");
		midiv.setAttribute("id", "panelFormatoComentario");
		midiv.innerHTML = "<h5> <b>"+ usuario +"</b> </hs> <hr> <h6>"+ comentario + "</h6>";
		document.getElementById("listaComentarios").appendChild(midiv);

		guardarComentarios();

		$("#cajaComentarios").attr("placeholder", "Inserte comentario*");
		document.getElementById("cajaComentarios").value = "";

		alert("Comentario cargado con éxito");

		$("#panelComentarios").show();
	}
	else
	{
		alert("No se cargó ningún comentario");
	}
  });
});
