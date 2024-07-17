using CLRSMSWEBAPI.Authentication;
using CLRSMSWEBAPI.FldrClass;
using CLRSMSWEBAPI.FldrModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CLRSMSWEBAPI.Controllers
{
    //[Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {

        //private UserAccountService _userAccountService;

        //public LoginController(UserAccountService userAccountService)
        //{
        //    _userAccountService = userAccountService;
        //} 

        [HttpGet]
        [Route("API/WebAPI/tblUserAll/LoginlUserInfo")]
        public ActionResult<UserSession> GetLoginlUserInfo(string Username, string Password)
        {
            var jwtAuthenticationManager = new JwtAuthenticatonManager(new UserAccountService());
            var userSession = jwtAuthenticationManager.GenerateJwtToken(Username, new ClsM5Hash().getMd5Hash(Password));
            if (userSession is null)
            {
                return Unauthorized();
            }
            else
            {

                return userSession;
            }
        }
    }
}
