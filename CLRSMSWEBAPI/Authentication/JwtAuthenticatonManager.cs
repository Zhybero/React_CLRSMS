using CLRSMSWEBAPI.FldrModel;
using Microsoft.IdentityModel.Tokens; 
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CLRSMSWEBAPI.Authentication
{
    public class JwtAuthenticatonManager
    {
        public const string JWT_Security_Key = "yHjs67HDSbsadfh96hsahkGIdajsd2Hah2h8Hk3asdawAz";
        private const int JWT_TOKEN_VALIDITY_MINS = 720;

        private UserAccountService _userAccountService;
        public JwtAuthenticatonManager(UserAccountService userAccountService)
        {
            _userAccountService = userAccountService;
        }

        public UserSession GenerateJwtToken(string userName, string password)
        {
            if(string.IsNullOrWhiteSpace(userName) || string.IsNullOrWhiteSpace(password))
                return null;

            var userAccount = _userAccountService.GetUserAccountByUserName(userName);
            if(userAccount == null || userAccount.PWord != password) 
                return null;

            var tokenExpiryTimeStamp = DateTime.Now.AddMinutes(JWT_TOKEN_VALIDITY_MINS);
            var tokenKey = Encoding.ASCII.GetBytes(JWT_Security_Key);
            var claimsIdentity = new ClaimsIdentity(new List<Claim>
            {
                new Claim(ClaimTypes.Name, userAccount.UserName),
                new Claim(ClaimTypes.Role, userAccount.GroupCode), 
            });

            var signingCredentials = new SigningCredentials(
                new SymmetricSecurityKey(tokenKey),
                SecurityAlgorithms.HmacSha256Signature);

            var securityTokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = claimsIdentity,
                Expires = tokenExpiryTimeStamp,
                SigningCredentials = signingCredentials
            };

            var jwtSecurityTokenHandler = new JwtSecurityTokenHandler();
            var securityToken = jwtSecurityTokenHandler.CreateToken(securityTokenDescriptor);
            var token = jwtSecurityTokenHandler.WriteToken(securityToken);

            var userSession = new UserSession
            {
                UserCode = userAccount.UserCode,
                UserName = userAccount.UserName,
                GroupCode = userAccount.GroupCode,
                Token = token,
                ExpiresIn = (int)tokenExpiryTimeStamp.Subtract(DateTime.Now).TotalSeconds,
                FName = userAccount.FName,
                LName = userAccount.LName,
                XName = userAccount.XName,
            };
            return userSession;
        }
    }
}
