$(function() {
  $("#linkEstilo").click(function() 
  {
    var id = localStorage.getItem("tema");
    if (id == 0) 
    {
      localStorage.setItem("tema", 1);
      $("link[href='css/clasico.css']").attr("href", "css/turbo.css");
    } 
    else 
    {
      localStorage.setItem("tema", 0);
      $("link[href='css/turbo.css']").attr("href", "css/clasico.css");
    }
  });
});