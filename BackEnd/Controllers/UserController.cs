using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BackEnd.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

namespace BackEnd.Controllers
{
    [Produces("application/json")]
    [Route("api/User")]
    public class UserController : Controller
    {


        private readonly ApplicationContext _context;
        private readonly UserManager<User> _userManager;

        public UserController(ApplicationContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        public class DateModel
        {
            public string date { get; set; }
        }

        [Authorize(Roles ="user")]
        [HttpPost]
        [Route("SetStudyDate")]
        public async Task<IActionResult> SetStudyDate([FromBody]DateModel data)
        {
            var userId = HttpContext.User.Claims.First().Value;

            var user = await _userManager.FindByIdAsync(userId);
            user.StartStudy = Convert.ToDateTime(data.date);
            _context.SaveChanges();

            return Ok(new
            {
                success = "ok"
            });

        }
    }
}