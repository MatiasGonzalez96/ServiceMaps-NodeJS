window.onload = function() 
{
	cargarTema();
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
  $("#botonFbLogin").click(function() {
    window.location.href = "index.html";
  });
});

$(function() {
  $("#linkInicio").click(function() {
    window.location.href = "index.html";
  });
});