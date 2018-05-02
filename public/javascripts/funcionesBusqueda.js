function cargarBusqueda()
{
  var nombresServicios = obtenerNombresServicios();
  $("#inputBusqueda").autocomplete({
    source: nombresServicios,
    select: function(event, ui) 
    {
      $("#inputBusqueda").val(ui.item.value);
      buscarInput(ui.item.value);
    }
  });
}

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
    window.location.href = "servicios/" + id + "/";
  } 
  else 
  {
    window.location.href = "/";
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

// Buscar solo con el comienzo de la palabra
$.ui.autocomplete.filter = function (array, term) 
{
    var matcher = new RegExp("^" + $.ui.autocomplete.escapeRegex(term), "i");
    return $.grep(array, function (value) 
    {
        return matcher.test(value.label || value.value || value);
    });
};