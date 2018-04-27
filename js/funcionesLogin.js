window.onload = function() 
{
	cargarTema();
  FB.Event.subscribe('xfbml.render', finished_rendering);
}

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

function checkLoginState() {
  FB.getLoginStatus(function(response) 
  {
    statusChangeCallback(response);
  });
}

function statusChangeCallback(response) 
{
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') 
    {
      // Logged into your app and Facebook.
      testAPI();
    } else 
    {
      // The person is not logged into your app or we are unable to tell.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    }
}

function testAPI() 
{
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
    });
}

var finished_rendering = function() {
  console.log("finished rendering plugins");
  var spinner = document.getElementById("spinner");
  spinner.removeAttribute("style");
  spinner.removeChild(spinner.childNodes[0]);
}

