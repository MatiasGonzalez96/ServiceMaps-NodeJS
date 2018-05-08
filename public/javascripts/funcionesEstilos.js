var valor;

$(function() {
  $.get("/api/tema", function (tema)
  {
    var temaActual = tema[0];
    valor = temaActual.valor;
    if (valor == 1)
    {
      $("#temaActual").attr("href", "/stylesheets/estiloTurbo.css");
    }
  });
});

$(function()
{
  $("#linkEstilo").click(function()
  {
    if (valor == "0")
    {
      guardarEnBaseDeDatos("1");
      $("link[href='/stylesheets/estiloClasico.css']").attr("href", "/stylesheets/estiloTurbo.css");
      valor = "1";
    }
    else
    {
      guardarEnBaseDeDatos("0");
      $("link[href='/stylesheets/estiloTurbo.css']").attr("href", "/stylesheets/estiloClasico.css");
      valor = "0";
    }
  });
});

function guardarEnBaseDeDatos(val)
{
  $.ajax({
      url: '/api/tema',
      type: 'POST',
      data: JSON.stringify({id: "1", valor: val}),
      contentType: "application/json",
      dataType: "json",
      success: function () {
          console.log("exito");
      },
      error: function (data) {
          console.log("error");
      }
  });
}
