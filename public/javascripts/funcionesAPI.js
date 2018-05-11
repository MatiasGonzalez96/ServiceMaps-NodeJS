window.fbAsyncInit = function()
{
    FB.init({
      appId            : '1071078366372805',
      autoLogAppEvents : true,
      xfbml            : true,
      version          : 'v2.12'
    });
};

function fb_login()
{
    FB.login(function(response)
    {
        if (response.authResponse)
        {
            access_token = response.authResponse.accessToken; //get access token
            user_id = response.authResponse.userID; //get FB UID

            FB.api('/me', function(response)
            {
                $("#infoUsuario").show();
                document.getElementById("infoUsuario").innerHTML = "Bienvenido/a " + response.name;
                localStorage.setItem("fb", response.name);
                getLogoutPanel();
                document.location.reload();
            });
        }
        else
        {
            //user hit cancel button
            console.log('User cancelled login or did not fully authorize.');
        }
    },
    {
        scope: 'public_profile,email'
    });
}

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
    $("#linkLogin").click(function()
    {
        fb_login();
    });
});

$(function()
{
    var usuario = localStorage.getItem("fb");
    if (usuario != undefined)
    {
        document.getElementById("infoUsuario").innerHTML = "Bienvenido/a " + usuario;
        $("#infoUsuario").show();
        getLogoutPanel();
    }
});

function getLogoutPanel()
{
    $("#linkLogin").remove();
    var log = document.createElement("a");
    log.setAttribute("id", "linkLogout");
    log.setAttribute("href", "#");
    log.innerHTML = "Cerrar Sesión";
    document.getElementById("panelLogin").appendChild(log);

    if (log.addEventListener)
    {
        log.addEventListener('click', logout, false);
    }
    else
    {
        log.attachEvent('onclick', logout);
    }
}

function logout()
{
    FB.getLoginStatus(function(response)
    {
        if (response && response.status === 'connected')
        {
            FB.logout(function(response)
            {
                document.location.reload();
            });
        }
    });
    localStorage.removeItem("fb");
}
