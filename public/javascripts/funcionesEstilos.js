$(function() 
{
  var id = localStorage.getItem("tema");
  if (id != undefined) 
  {
    if (id == 1) 
    {
      $("#temaActual").attr("href", "/stylesheets/estiloTurbo.css");
    }
  }
  else
  {
    localStorage.setItem("tema", 0);
  }
});

$(function() 
{
  $("#linkEstilo").click(function() 
  {
    var id = localStorage.getItem("tema");
    if (id == 0) 
    {
      localStorage.setItem("tema", 1);
      $("link[href='/stylesheets/estiloClasico.css']").attr("href", "/stylesheets/estiloTurbo.css");
    } 
    else 
    {
      localStorage.setItem("tema", 0);
      $("link[href='/stylesheets/estiloTurbo.css']").attr("href", "/stylesheets/estiloClasico.css");
    }
  });
});