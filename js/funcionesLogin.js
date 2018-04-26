window.onload = function() 
{
  cargarAPIFacebook();
	cargarTema();
}

function cargarAPIFacebook()
{
  window.fbAsyncInit = function() {
      FB.init({
        appId            : '1071078366372805',
        autoLogAppEvents : true,
        xfbml            : true,
        version          : 'v2.12'
      });

      FB.getLoginStatus(function(response){
        if (response.status === 'connected' )
        {
          document.getElementById("panelLogin").innerHTML = 'We are connected';
        }
        else 
          if (response.status === 'not_authorized')
          {
           document.getElementById("panelLogin").innerHTML = 'We are not logged in';
          }
          else
          {
            document.getElementById("panelLogin").innerHTML = 'You are not logged into Facebook';
          }

      });
  };  
}

(function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = "https://connect.facebook.net/en_US/sdk.js";
         fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

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
    FB.login(function(response )
    {
      if (response.status === 'connected' )
        {
          document.getElementById("panelLogin").innerHTML = 'We are connected';
        }
        else 
          if (response.status === 'not_authorized')
          {
           document.getElementById("panelLogin").innerHTML = 'We are not logged in';
          }
          else
          {
            document.getElementById("panelLogin").innerHTML = 'You are not logged into Facebook';
          }
    });
  });
});

$(function() {
  $("#botonObtenerInfo").click(function() {
    FB.api('/me', 'GET', {fields: 'first_name,last_name,name,id'}, function(response)
    {
      document.getElementById("panelLogin").innerHTML = response.first_name + response.last_name;
    });
  });
});

$(function() {
  $("#linkInicio").click(function() {
    window.location.href = "index.html";
  });
});