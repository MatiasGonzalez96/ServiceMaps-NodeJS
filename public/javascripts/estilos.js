$(function() {
  $("#linkEstilo").click(function() 
  {
    var id = localStorage.getItem("tema");
    if (id == 0) 
    {
      localStorage.setItem("tema", 1);
      $("link[href='/stylesheets/clasico.css']").attr("href", "/stylesheets/turbo.css");
    } 
    else 
    {
      localStorage.setItem("tema", 0);
      $("link[href='/stylesheets/turbo.css']").attr("href", "/stylesheets/clasico.css");
    }
  });
});