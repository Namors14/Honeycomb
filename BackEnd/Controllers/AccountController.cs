using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BackEnd.ViewModel;
using BackEnd.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Cors;
using System.Collections.Generic;
using System.Web;
using System.Linq;
using BackEnd.App;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication;
using System;
using System.IdentityModel.Tokens.Jwt;
using BackEnd.Helpers;
using Microsoft.Extensions.Options;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;



namespace CustomIdentityApp.Controllers
{
    [Produces("application/json")]
    [Route("api/Account")]
    public class AccountController : Controller
    {
        private readonly IAuthenticationSchemeProvider authenticationSchemeProvider;

        public static string Base64Encode(string plainText)
        {
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(plainText);
            return System.Convert.ToBase64String(plainTextBytes);
        }

        public static string Base64Decode(string base64EncodedData)
        {
            var base64EncodedBytes = System.Convert.FromBase64String(base64EncodedData);
            return System.Text.Encoding.UTF8.GetString(base64EncodedBytes);
        }

        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;

        private readonly AppSettings _appSettings;

        public AccountController(IOptions<AppSettings> appSettings, UserManager<User> userManager, SignInManager<User> signInManager, IAuthenticationSchemeProvider authenticationSchemeProvider)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            this.authenticationSchemeProvider = authenticationSchemeProvider;
            _appSettings = appSettings.Value;
        }

      public  async Task<string> CreateToken(User user)
        {
            var claims = new List<Claim>
           {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id)
           };

            var roles = await _userManager.GetRolesAsync(user);
            foreach (var item in roles)
            {
                claims.Add(new Claim(ClaimsIdentity.DefaultRoleClaimType, item));
            }

            var signingKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_appSettings.Secret));
            var signingCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);

            var jwt = new JwtSecurityToken(signingCredentials: signingCredentials, claims: claims);
            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }

        [Authorize]
        [HttpGet]
        [Route("GetUSer")]
        public async Task<IActionResult> GetUser()
        {
            var userId = HttpContext.User.Claims.First().Value;

            var user = await _userManager.FindByIdAsync(userId);

            return Ok(user);
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody]LoginModel userDto)
        {

            var result = await _signInManager.PasswordSignInAsync(userDto.UserName, userDto.Password, userDto.RememberMe, false);
            if (result.Succeeded)
            {
                var user = await _userManager.FindByNameAsync(userDto.UserName);

                if (user != null)
                {
                    if (!await _userManager.IsEmailConfirmedAsync(user))
                    {
                        return Ok(new
                        {
                            Error = "Email is not confirmed"
                        });
                    }
                }

                var roles = await _userManager.GetRolesAsync(user);

                var claims = new List<Claim>
                {
                     new Claim(JwtRegisteredClaimNames.Sub, user.Id)
                };
                foreach (var item in roles)
                {
                    claims.Add(new Claim(ClaimsIdentity.DefaultRoleClaimType, item));
                }

                var signingKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_appSettings.Secret));
                var signingCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);

                var jwt = new JwtSecurityToken(signingCredentials: signingCredentials, claims: claims);
                var token = new JwtSecurityTokenHandler().WriteToken(jwt);

                return Ok(new
                {
                    Name = user.UserName,
                    Details = user.Details,
                    Address = user.Address,
                    Email = user.Email,
                    Country = user.Country,
                    City = user.City,
                    StudyDate = (user.StartStudy==null)? null : user.StartStudy.Value.ToShortDateString(),
                    Token = token
                });

            }
            else
            {
                return Ok(new
                {
                    Error= "Username or password is incorrect"
                });
            }
        }



        [HttpPost]
        [Route("Register")]
        [AllowAnonymous]
        public async Task<List<string>> Register([FromBody]RegisterModel model)
        {
            List<string> errors = new List<string>();
            if (ModelState.IsValid)
            {

                User user = new User {Details = model.Details, Email = model.Email, Address = model.Address, City = model.City, Country = model.Country, UserName = model.UserName };
                var result = await _userManager.CreateAsync(user, model.Password);
                if (result.Succeeded)
                {
                    var role = await _userManager.AddToRolesAsync(user, new List<string>() { "user" });
                    var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                    var callbackUrl = Url.Action(
                        "ConfirmEmail",
                        "Account",
                        new { userId = user.Id, code = code },
                        protocol: HttpContext.Request.Scheme);
                    EmailService emailService = new EmailService();
                    await emailService.SendEmailAsync(model.Email, "Confirm your account",
                        $"Подтвердите регистрацию, перейдя по ссылке: <a href='{callbackUrl}'>link</a>");

                    // await _signInManager.SignInAsync(user, isPersistent: false);
                }
                else
                {
                    foreach (var error in result.Errors)
                    {
                        errors.Add(error.Description);
                    }
                }
            }
            return errors;
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("ConfirmEmail")]
        public async Task<IActionResult> ConfirmEmail([FromQuery]string userId, [FromQuery]string code)
        {
            if (userId == null || code == null)
            {
                return LocalRedirect("/");
            }
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return LocalRedirect("/");
            }
            var result = await _userManager.ConfirmEmailAsync(user, code);
            return LocalRedirect(result.Succeeded ? "/email-confirm?success=true" : "/");
        }


        [HttpPost]
        [Route("ForgotPassword")]
        [AllowAnonymous]
        public async Task<List<string>> ForgotPassword([FromBody]ForgotPasswordModel model)
        {
            List<string> errors = new List<string>();
            if (ModelState.IsValid)
            {
                var user = await _userManager.FindByEmailAsync(model.Email);
                if (user == null )
                {
                    errors.Add("User is not defined or email is not confirmed");
                    return errors;
                }
                

                var code = await _userManager.GeneratePasswordResetTokenAsync(user);
                code = Base64Encode(code);
                var callbackUrl = Url.Action("ResetPassword", "Account", new { userId = user.Id, code = code }, protocol: HttpContext.Request.Scheme);
                EmailService emailService = new EmailService();
                await emailService.SendEmailAsync(model.Email, "Reset Password",
                    $"Для сброса пароля пройдите по ссылке: <a href='{callbackUrl}'>link</a>");
                return errors;
            }
            return errors;
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("ResetPassword")]
        public IActionResult ResetPassword([FromQuery]string userId, [FromQuery]string code)
        {
            return LocalRedirect($"/reset-password?userId={userId}&code={code}");
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("ResetPassword")]
        public async Task<List<string>> ResetPassword([FromBody]ResetPasswordModel model)
        {
            List<string> errors = new List<string>();
            if (!ModelState.IsValid)
            {
                return errors;
            }
            var user = await _userManager.FindByIdAsync(model.Id);
            if (user == null)
            {
                errors.Add("User is not defined");
                return errors;
            }
            model.Code = Base64Decode(model.Code);
            var result = await _userManager.ResetPasswordAsync(user, model.Code, model.Password);
            if (result.Succeeded)
            {
                return errors;

            } else
            {
                foreach (var error in result.Errors)
                {
                    errors.Add(error.Description);
                }
            }
            return errors;
        }

       
        
        //public async Task<IActionResult> FacebookLogin1()
        //{
        //    var allSchemeProvider = (await authenticationSchemeProvider.GetAllSchemesAsync()).
        //        Select(n => n.DisplayName).Where(n => !String.IsNullOrEmpty(n));

        //    return View(allSchemeProvider);
        //}
        [HttpGet]
        [AllowAnonymous]
        [Route("FacebookLogin")]
        public IActionResult FacebookLogin(String provider)
        {
            return Challenge(new AuthenticationProperties { RedirectUri = "/forgot" }, provider);
        }

        
    }
}