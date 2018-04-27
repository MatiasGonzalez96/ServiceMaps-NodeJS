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
            console.log('Welcome!  Fetching your information.... ');
            //console.log(response); // dump complete info
            access_token = response.authResponse.accessToken; //get access token
            user_id = response.authResponse.userID; //get FB UID

            FB.api('/me', function(response) 
            {
                user_email = response.email; //get user email
                // you can store this data into your database             
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

$(function() {
    $("#linkLogin").click(function() {
        fb_login();
    });
});