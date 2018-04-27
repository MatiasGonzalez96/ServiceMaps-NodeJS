window.fbAsyncInit = function() 
{
    FB.init({
      appId            : '1071078366372805',
      autoLogAppEvents : true,
      xfbml            : true,
      version          : 'v2.12'
    });
}; 

(function(d, s, id)
{
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

$(function() 
{
  $("#botonFbLogin").click(function() 
  {
    FB.login(function(response )
    {
      if (response.status === 'connected' )
        {
          document.getElementById("panelEstado").innerHTML = 'We are connected';
        }
        else 
          if (response.status === 'not_authorized')
          {
           document.getElementById("panelEstado").innerHTML = 'We are not logged in';
          }
          else
          {
            document.getElementById("panelEstado").innerHTML = 'You are not logged into Facebook';
          }
    });
  });
});

function checkLoginState() 
{
  FB.getLoginStatus(function(response) 
  {
    statusChangeCallback(response);
  });
}

function statusChangeCallback(response) 
{
    if (response.status === 'connected') 
    {
      // Logged into your app and Facebook.
      testAPI();
    } else 
    {
      // The person is not logged into your app or we are unable to tell.
      document.getElementById('panelEstado').innerHTML = 'Please log into this app.';
    }
}

function testAPI() 
{
  FB.api('/me', function(response) 
  {
    document.getElementById('panelEstado').innerHTML = 'Thanks for logging in, ' + response.name + '!';
  });
}

$(function() {
  var id = localStorage.getItem("tema");
      if (id != undefined) 
      {
        if (id == 1) 
        {
          $("#temaActual").attr("href", "css/turbo.css");
        }
      }
});

$(function() {
  $("#linkInicio").click(function() {
    window.location.href = "index.html";
  });
});

