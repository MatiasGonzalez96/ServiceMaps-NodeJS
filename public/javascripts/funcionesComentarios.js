
$(function()
{
	var usuario = localStorage.getItem("fb");
	if (usuario != undefined)
	{
			document.getElementById("nombreUsuario").innerHTML += usuario;
	}
    else
	{
	  	mostrarMensajeLogeo();
	}
});

function mostrarMensajeLogeo()
{
	ocultarPaneles();

	var midiv = document.getElementById("panelFormulario");
	midiv.setAttribute("id","panelError");

	$("#panelError").html("<span id='etiquetaError'><b>¡Debe iniciar sesión para dejar su comentario!</b></span>");

	var rutaVolver = "/servicios/" + idServicio + "/";

	$("#panelError").append("<span id='etiquetaAviso'><a id='linkVolverError' href='"+rutaVolver+"'>Volver</a></span>");
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
    window.location.href = "/servicios/" + idServicio + "/";
  });
});

$(function() {
  $("#botonPostear").click(function() {
    guardarComentario();
  });
});

function guardarComentario()
{
    const coment = $('#cajaComentarios').val();
    //const user = localStorage.getItem("fb");
    const user = "matias";
		const date = new Date();

		if(coment != "")
		{

	    $.ajax({
	        url: '/api/comentarios/'+idServicio,
	        type: 'POST',
	        data: JSON.stringify({id: idServicio, comentario : coment, usuario: user, fecha: date}),
	        contentType: "application/json",
	        dataType: "json",
	        success: function () {
	            mostrarComentario(coment, user, date);
	        },
	        error: function (data) {
	            console.log("error");
	        }
	    });
		}
		else
		{
			alert("Debe ingresar un comentario");
		}
}

function mostrarComentario(comentario, usuario, date)
{
	$("#listaComentarios").empty();

	//Creo el panel con el comentario
	var midiv = document.createElement("div");
	midiv.setAttribute("id", "panelFormatoComentario");

	var span1 = document.createElement("span");
	span1.setAttribute("id", "formatoComentariosNombre");
	span1.innerHTML = "<b> Usuario: " + usuario + "</b>";

	var span2 = document.createElement("span");
	span2.setAttribute("id", "formatoComentariosFecha");
	span2.innerHTML = "<b> Fecha: " + date + "</b>";

	var span3 = document.createElement("span");
	span3.setAttribute("id", "formatoComentariosTexto");
	var textoSpan3 = document.createTextNode(comentario);
	span3.appendChild(textoSpan3);

	var separador = document.createElement("hr");

	var enter = document.createElement("br");

	midiv.appendChild(span1);
	midiv.appendChild(enter);
	midiv.appendChild(span2);
	midiv.appendChild(separador);
	midiv.appendChild(span3);

	document.getElementById("listaComentarios").appendChild(midiv);

	mostrarPaneles();
}

function mostrarPaneles()
{
	$("#cajaComentarios").attr("placeholder", "Inserte comentario*");
	document.getElementById("cajaComentarios").value = "";
}
