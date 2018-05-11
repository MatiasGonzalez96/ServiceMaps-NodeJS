$(function()
{
    $("#linkInicio").click(function()
    {
        window.location.href = "/";
    });
});

//Show active btns
$(function()
{
    var btnContainer = document.getElementById("panelBotoneraFiltro");
    var btns = btnContainer.getElementsByClassName("botonFiltrar");
    for (var i = 0; i < btns.length; i++)
    {
        btns[i].addEventListener("click", function()
        {
            var current = document.getElementsByClassName("activo");
            current[0].className = current[0].className.replace(" activo", "");
            this.className += " activo";
        });
    }
});

$(function()
{
    $("#filtrarTodos").click(function()
    {
        for(var i = 0; i < marcadores.length; i++)
        {
          marcadores[i].setMap(null);
        }
        for(var i = 0; i < servicios.length; i++)
        {
            cargarMarcador(servicios[i]);
        }
    });
});

$(function()
{
    $("#filtrarEstaciones").click(function()
    {
        getMarkerByType("Estación de Servicio");
    });
});

$(function()
{
    $("#filtrarGomerias").click(function()
    {
        getMarkerByType("Gomería");
    });
});

$(function()
{
    $("#filtrarTalleres").click(function()
    {
        getMarkerByType("Taller Mecánico");
    });
});

function getMarkerByType(type)
{
    for(var i = 0; i < marcadores.length; i++)
    {
        marcadores[i].setMap(null);
    }
    for(var i = 0; i < servicios.length; i++)
    {
        if(servicios[i].tipo == type)
        {
            cargarMarcador(servicios[i]);
        }
    }
}
