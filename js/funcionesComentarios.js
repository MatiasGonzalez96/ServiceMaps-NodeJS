var servicioActual = "";
var temaActual = "";

function cargarFuncionesInicio()
{
	recuperarTemaPaginaComentarios();
	obtenerVariablesURL();
	recuperarComentarios();
}

function obtenerVariablesURL()
{
	var URLactual = window.location;
	var atributos = obtenerParametrosURL();	
	servicioActual = atributos["nombre"];
	var auxTema = atributos["tema"];
	seleccionarTema(auxTema);
	cambiarTema();	
	agregarNombreServicio();	
}

function obtenerParametrosURL()
{
   var loc = document.location.href;
   var getString = loc.split('?')[1];
   var GET = getString.split('&');
   var get = {};

   for(var i = 0, l = GET.length; i < l; i++){
      var tmp = GET[i].split('=');
      get[tmp[0]] = unescape(decodeURI(tmp[1]));
   }
   return get;
}

function seleccionarTema(id)
{
	if (id == 0)
	{
		temaActual = "Proyecto/css/EstilosComentarios1.css";
	}
	else
	{
		temaActual = "Proyecto/css/EstilosComentarios2.css";
	}
}

function agregarNombreServicio()
{
	document.getElementById("nombreServicio").innerHTML += "<b>"+servicioActual+"</b>";
}

function guardarTemaPaginaComentarios()
{
	localStorage.setItem("temaComentarios",temaActual);
}

function recuperarTemaPaginaComentarios()
{
	var t = localStorage.getItem("temaComentarios");
	if (t != null)
	{
		$("#HojaDeEstilosComentarios").attr("href", t);
	}
}

function cambiarTema()
{
	$("#HojaDeEstilosComentarios").attr("href", temaActual);
	guardarTemaPaginaComentarios();
}

function guardarComentarios()
{
	var comentarios = document.getElementById("listaComentarios").value;
	localStorage.setItem(servicioActual, comentarios);
}

function recuperarComentarios()
{
	var t = localStorage.getItem(servicioActual);
	if (t != null)
	{
		document.getElementById("listaComentarios").innerHTML = t;
	}
}

function oyenteBotonVolver()
{
	setTimeout("location.href='index.html'", 0);
}

function oyenteBotonPostear()
{
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
				document.getElementById("listaComentarios").innerHTML += "Nombre: "+nombre+" "+apellido+"\nComentario: "+comentario +"\n";
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
}